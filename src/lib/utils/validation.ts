import { writable, type Writable } from 'svelte/store';
import type { I18n, I18nParams } from './i18n.js';

const reEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const reTimeMM = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$/;
const reTimeSS = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
const reUrl =
	/[a-z]+:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export type InputConstraintsType =
	| 'number'
	| 'email'
	| 'text'
	| 'password'
	| 'color'
	| 'date'
	| 'time'
	| 'datetime'
	| 'url'
	| 'checkbox'
	| 'select-one';
export type InputConstraints = {
	type?: InputConstraintsType;
	required?: boolean;
	maxlength?: number;
	min?: number;
	max?: number;
	pattern?: string;
	step?: string | number;
};
export type UseInput = (node: HTMLInputElement) => { destroy(): void };
export type UseTextArea = (node: HTMLTextAreaElement) => { destroy(): void };
export type UseSelect = (node: HTMLSelectElement) => { destroy(): void };

export type Validator = (errors: ValidatorErrors, value: any) => void;
export type ValidationError = {
	message: string;
	params?: I18nParams;
};
export type ValidatorErrors = {
	[field: string]: ValidationError[];
};

export abstract class FieldValidator {
	field = '';
	prefix = '';
	readonly validators: Validator[] = [];
	constructor(
		readonly constraints: InputConstraints,
		readonly message: string,
	) {
		this.actionInput = this.actionInput.bind(this);
		this.actionSelect = this.actionSelect.bind(this);
	}

	get input() {
		return {
			id: this.field,
			name: this.field,
			...this.constraints,
		};
	}
	abstract map(src: any): any;
	label(i18n: I18n): string {
		return i18n.str([this.prefix, this.field].filter(Boolean).join('_'));
	}
	validate(errors: ValidatorErrors, value: any) {
		this.validators.forEach((v) => v(errors, value));
		return errors;
	}
	pushError(errors: ValidatorErrors, message: string, params?: I18nParams) {
		const messages = errors[this.field] || [];
		messages.push({ message, params });
		errors[this.field] = messages;
	}
	actionInput(
		error: Writable<string>,
		dirty?: Writable<boolean>,
		action?: (value: string, validationMessage?: string) => void,
	): UseInput {
		return (node: HTMLInputElement) => {
			const self = this;
			onInput();
			dirty?.set(false);
			node.addEventListener('input', onInput);
			function onInput(e?: Event) {
				dirty?.set(true);
				const validationMessage = node.validationMessage;
				if (validationMessage) {
					error.set(validationMessage || self.message);
				} else {
					error.set('');
				}
				if (e && action) action((e.target as HTMLInputElement).value, validationMessage);
			}
			return {
				destroy() {
					node.removeEventListener('input', onInput);
				},
			};
		};
	}
	actionTextarea(
		error: Writable<string>,
		dirty?: Writable<boolean>,
		action?: (value: string, validationMessage?: string) => void,
	): UseTextArea {
		return (node: HTMLTextAreaElement) => {
			const self = this;
			onInput();
			dirty?.set(false);
			node.addEventListener('input', onInput);
			function onInput(e?: Event) {
				dirty?.set(true);
				const validationMessage = node.validationMessage || '';
				error.set(validationMessage);
				if (e && action) action((e.target as HTMLInputElement).value, validationMessage);
			}
			return {
				destroy() {
					node.removeEventListener('input', onInput);
				},
			};
		};
	}
	actionSelect(error: Writable<string>, dirty?: Writable<boolean>): UseSelect {
		return (node: HTMLSelectElement) => {
			const self = this;
			onChange();
			dirty?.set(false);
			node.addEventListener('change', onChange);
			function onChange() {
				dirty?.set(true);
				const validationMessage = node.validationMessage || '';
				error.set(validationMessage);
			}
			return {
				destroy() {
					node.removeEventListener('change', onChange);
				},
			};
		};
	}
	actionCheckbox(
		error: Writable<string>,
		dirty?: Writable<boolean>,
		action?: (value: boolean, validationMessage?: string) => void,
	): UseInput {
		return (node: HTMLInputElement) => {
			const self = this;
			onInput();
			dirty?.set(false);
			node.addEventListener('input', onInput);
			function onInput(e?: Event) {
				dirty?.set(true);
				const validationMessage = node.validationMessage || '';
				error.set(validationMessage);
				if (e && action) action((e.target as HTMLInputElement).checked, validationMessage);
			}
			return {
				destroy() {
					node.removeEventListener('input', onInput);
				},
			};
		};
	}
}

export class StringValidator extends FieldValidator {
	_trim = false;
	passwordMessage = '';
	constructor(
		message: string = 'validator_type_string',
		constraints: InputConstraints = { type: 'text' },
	) {
		super(constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (typeof value !== 'string') {
				this.pushError(errors, message);
			}
		});
	}
	map(src: any): any {
		if (src == null || src == '') return null;
		return this._trim ? src.trim() : src;
	}

	required(message: string = 'validator_required'): StringValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value == '') {
				this.pushError(errors, message);
			}
		});
		return this;
	}

	maxlength(max: number, message: string = 'validator_max_length'): StringValidator {
		const self = this;
		this.constraints.maxlength = max;
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (value.toString().length > max) {
				this.pushError(errors, message, { max });
			}
		});
		return this;
	}
	pattern(pattern: string, message: string): StringValidator {
		this.constraints.pattern = pattern;
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (!RegExp(pattern).test(value)) {
				this.pushError(errors, message);
			}
		});
		return this;
	}
	password(): StringValidator {
		this.constraints.type = 'password';
		return this;
	}
	selectOne(): StringValidator {
		this.constraints.type == 'select-one';
		return this;
	}
	trim(): StringValidator {
		this._trim = true;
		return this;
	}
	email(message: string = 'validator_email_not_valid'): StringValidator {
		this.constraints.type = 'email';
		this.validators.push((errors, value) => {
			if (!value) return;
			if (!reEmail.test(value)) {
				this.pushError(errors, message);
			}
		});
		return this;
	}
	url(message: string = 'validator_url_not_valid'): StringValidator {
		this.constraints.type = 'url';
		this.validators.push((errors, value) => {
			if (!value) return;
			if (!reUrl.test(value)) {
				this.pushError(errors, message);
			}
		});
		return this;
	}
	enum(message: string, ...values: string[]): StringValidator {
		this.constraints.pattern = values.join('|');
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (values.indexOf(value) == -1) {
				this.pushError(errors, message, { values: values.join(', ') });
			}
		});
		return this;
	}
}

export class NumberValidator extends FieldValidator {
	constructor(
		message: string = 'validator_number_not_valid',
		constraints: InputConstraints = { type: 'number' },
	) {
		super(constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (typeof value != 'number' || isNaN(value)) {
				this.pushError(errors, message);
			}
		});
	}

	map(src: any): any {
		if (src == null || src === '') {
			return null;
		}
		return +src.toString();
	}
	required(message: string = 'validator_required'): NumberValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value === '') {
				this.pushError(errors, message);
			}
		});
		return this;
	}
	step(step: number | string, message?: string): NumberValidator {
		this.constraints.step = step;
		return this;
	}
	min(min: number, message: string = 'validator_ge'): NumberValidator {
		const self = this;
		this.constraints.min = min;
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (+value < min) {
				this.pushError(errors, message, { min });
			}
		});
		return this;
	}
	max(max: number, message: string = 'validator_le'): NumberValidator {
		const self = this;
		this.constraints.max = max;
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (+value > max) {
				this.pushError(errors, message, { max });
			}
		});
		return this;
	}
}

export class BigintValidator extends FieldValidator {
	constructor(
		message: string = 'validator_bigint_not_valid',
		constraints: InputConstraints = { type: 'text' },
	) {
		super(constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (typeof value != 'bigint') {
				this.pushError(errors, message);
			}
		});
	}

	map(src: any): any {
		if (src == null || src == '') return null;
		return BigInt(src);
	}
	required(message: string = 'validator_required'): BigintValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value === '') {
				this.pushError(errors, message);
			}
		});
		return this;
	}
}

export class DateValidator extends FieldValidator {
	constructor(
		message: string = 'validator_date_not_valid',
		constraints: InputConstraints = { type: 'date' },
	) {
		super(constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			const isValid = !isNaN(+new Date(value));
			if (!isValid) {
				this.pushError(errors, message);
			}
		});
	}
	map(src: string) {
		if (src == null) return null;
		return new Date(src);
	}
	required(message: string = 'validator_required'): DateValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value == '') {
				this.pushError(errors, message);
			}
		});
		return this;
	}
}

export class TimeValidator extends FieldValidator {
	constructor(
		message: string = 'validator_time_not_valid',
		withSeconds: boolean = false,
		constraints: InputConstraints = { type: 'time' },
	) {
		super(constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			const isValid = (withSeconds ? reTimeSS : reTimeMM).test(value);
			if (!isValid) {
				this.pushError(errors, message);
			}
		});
	}
	map(src: string) {
		if (src == null) return null;
		return src.toString();
	}
	required(message: string = 'validator_required'): TimeValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value == '') {
				this.pushError(errors, message);
			}
		});
		return this;
	}
}

export class DateTimeValidator extends FieldValidator {
	constructor(
		message: string = 'validator_datetime_not_valid',
		constraints: InputConstraints = { type: 'datetime' },
	) {
		super(constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			const isValid = !isNaN(+new Date(value));
			if (!isValid) {
				this.pushError(errors, message);
			}
		});
	}
	map(src: string) {
		if (src == null) return null;
		return new Date(src);
	}
	required(message: string = 'validator_required'): DateTimeValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value == '') {
				this.pushError(errors, message);
			}
		});
		return this;
	}
}

export class BooleanValidator extends FieldValidator {
	constructor(
		message: string = 'validator_boolean_not_valid',
		constraints: InputConstraints = { type: 'checkbox' },
	) {
		super(constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (typeof value !== 'boolean') {
				this.pushError(errors, message);
			}
		});
	}
	map(src: string) {
		if (src === undefined) return false;
		if (src == null) return null;
		const isTrue = ['yes', 'on', 'true', '1'].some((s) => s === src);
		const isFalse = ['no', 'false', '0'].some((s) => s === src);
		return isTrue || isFalse ? isTrue : null;
	}
	required(message: string = 'validator_required'): BooleanValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value === null || value === undefined || value === '') {
				this.pushError(errors, message);
			}
		});
		return this;
	}
}

export type SchemaDefinition<T extends {}> = {
	[P in keyof T]: FieldValidator;
};

export class Schema<T extends {}, V extends SchemaDefinition<T>> {
	constructor(
		readonly def: V,
		prefix: string = 'field',
	) {
		Object.entries(def).forEach(([key, val]) => {
			const fVal = val as FieldValidator;
			fVal.field = key;
			fVal.prefix = prefix;
		});
	}

	fromObject(src: any): [T, ValidatorErrors | null] {
		const res: any = {};
		const errors: ValidatorErrors = {};
		Object.entries(this.def).forEach(([key, defValue]) => {
			const val = defValue as FieldValidator;
			const value = val.map(src[key]);
			res[key] = value;
			val.validate(errors, value);
		});

		return [res as T, Object.keys(errors).length ? errors : null];
	}
	dirty(): Writable<boolean> {
		return writable<boolean>(false);
	}
	error(): Writable<string> {
		return writable<string>('');
	}
	stores(): [Writable<string>, Writable<boolean>] {
		return [this.error(), this.dirty()];
	}
}

export function valStores(): [Writable<string>, Writable<boolean>] {
	return [writable(''), writable(false)];
}
export function valNumber(message?: string | null): NumberValidator {
	return new NumberValidator(message || undefined);
}
export function valBigint(message?: string | null): BigintValidator {
	return new BigintValidator(message || undefined);
}
export function valString(message?: string | null): StringValidator {
	return new StringValidator(message || undefined);
}
export function valDate(message?: string | null): DateValidator {
	return new DateValidator(message || undefined);
}
export function valTime(message?: string | null, withSeconds: boolean = false): TimeValidator {
	return new TimeValidator(message || undefined, withSeconds);
}
export function valDateTime(message?: string | null): DateTimeValidator {
	return new DateTimeValidator(message || undefined);
}
export function valBoolean(message?: string | null): BooleanValidator {
	return new BooleanValidator(message || undefined);
}

export function hasErrorFromList(src: string[]): boolean {
	return src.filter(Boolean).length > 0;
}
export function hasDirtyFromList(src: boolean[]): boolean {
	return src.filter(Boolean).length > 0;
}
