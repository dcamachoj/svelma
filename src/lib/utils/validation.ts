import type { Action } from 'svelte/action';
import { writable, type Readable, type Writable } from 'svelte/store';

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
	| 'checkbox';
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
export type ValidatorErrors = {
	[key: string]: string[];
};

export abstract class FieldValidator {
	_name = '';
	readonly validators: Validator[] = [];
	constructor(
		readonly title: string,
		readonly constraints: InputConstraints,
		readonly message?: string,
	) {
		this.actionInput = this.actionInput.bind(this);
		this.actionSelect = this.actionSelect.bind(this);
	}

	get name() {
		return this._name;
	}
	setName(value: string) {
		this._name = value;
	}
	get input() {
		return {
			id: this.name,
			name: this.name,
			...this.constraints,
		};
	}
	abstract map(src: any): any;
	actionInput(
		error: Writable<string>,
		dirty?: Writable<boolean>,
		action?: (value: string) => void,
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
					error.set(self.message || validationMessage);
				} else {
					error.set('');
				}
				if (e && action && !validationMessage) action((e.target as HTMLInputElement).value);
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
		action?: (value: string) => void,
	): UseTextArea {
		return (node: HTMLTextAreaElement) => {
			const self = this;
			onInput();
			dirty?.set(false);
			node.addEventListener('input', onInput);
			function onInput(e?: Event) {
				dirty?.set(true);
				const validationMessage = node.validationMessage;
				if (validationMessage) {
					error.set(self.message || validationMessage);
				} else {
					error.set('');
				}
				if (e && action && !validationMessage) action((e.target as HTMLInputElement).value);
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
				const validationMessage = node.validationMessage;
				if (validationMessage) {
					error.set(self.message || validationMessage);
				} else {
					error.set('');
				}
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
		action?: (value: boolean) => void,
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
					error.set(self.message || validationMessage);
				} else {
					error.set('');
				}
				if (e && action && !validationMessage) action((e.target as HTMLInputElement).checked);
			}
			return {
				destroy() {
					node.removeEventListener('input', onInput);
				},
			};
		};
	}
	validate(errors: ValidatorErrors, value: any) {
		this.validators.forEach((v) => v(errors, value));
		return errors;
	}
	pushError(errors: ValidatorErrors, message: string) {
		const messages = errors[this.name] || [];
		messages.push(message);
		errors[this.name] = messages;
	}
}

export class StringValidator extends FieldValidator {
	_trim = false;
	passwordMessage = '';
	constructor(
		title: string,
		message: string | undefined = undefined,
		constraints: InputConstraints = { type: 'text' },
	) {
		super(title, constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (typeof value !== 'string') {
				this.pushError(errors, message || `${title} debe ser texto`);
			}
		});
	}
	map(src: any): any {
		if (src == null || src == '') return null;
		return this._trim ? src.trim() : src;
	}

	required(message?: string): StringValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value == '') {
				this.pushError(errors, message || `${this.title} es requerido`);
			}
		});
		return this;
	}

	maxlength(max: number, message?: string): StringValidator {
		const self = this;
		this.constraints.maxlength = max;
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (value.toString().length > max) {
				this.pushError(errors, message || `Longitud de ${self.title} no debe ser mayor a ${max}`);
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
		this.passwordMessage =
			'Debe tener al menos 8 letras, un símbolo, una mayúscula, una minúscula y un número';
		this.pattern(
			'^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+.])).{8,}$',
			this.passwordMessage,
		);
		this.constraints.type = 'password';
		return this;
	}
	trim(): StringValidator {
		this._trim = true;
		return this;
	}
	email(message?: string): StringValidator {
		this.constraints.type = 'email';
		this.validators.push((errors, value) => {
			if (!value) return;
			if (!reEmail.test(value)) {
				this.pushError(errors, message || `${this.title} debe ser un correo electónico`);
			}
		});
		return this;
	}
	url(message?: string): StringValidator {
		this.constraints.type = 'url';
		this.validators.push((errors, value) => {
			if (!value) return;
			if (!reUrl.test(value)) {
				this.pushError(errors, message || `${this.title} debe ser un hipervínculo`);
			}
		});
		return this;
	}
	enum(message: string, ...values: string[]): StringValidator {
		this.constraints.pattern = values.join('|');
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (values.indexOf(value) == -1) {
				this.pushError(
					errors,
					message || `${this.title} debe ser cualquiera de: ${values.join(', ')}`,
				);
			}
		});
		return this;
	}
}

export class NumberValidator extends FieldValidator {
	constructor(
		title: string,
		message: string | undefined = undefined,
		constraints: InputConstraints = { type: 'number' },
	) {
		super(title, constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (typeof value != 'number' || isNaN(value)) {
				this.pushError(errors, this.message || `${this.title} debe ser un número`);
			}
		});
	}

	map(src: any): any {
		if (src == null || src === '') {
			return null;
		}
		return +src.toString();
	}
	required(message?: string): NumberValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value === '') {
				this.pushError(errors, message || `${this.title} es requerido`);
			}
		});
		return this;
	}
	step(step: number | string, message?: string): NumberValidator {
		this.constraints.step = step;
		return this;
	}
	min(min: number, message?: string): NumberValidator {
		const self = this;
		this.constraints.min = min;
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (+value < min) {
				this.pushError(errors, message || `${self.title} no debe ser menor a ${min}`);
			}
		});
		return this;
	}
	max(max: number, message?: string): NumberValidator {
		const self = this;
		this.constraints.max = max;
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (+value > max) {
				this.pushError(errors, message || `${self.title} no debe ser mayor a ${max}`);
			}
		});
		return this;
	}
}

export class BigintValidator extends FieldValidator {
	constructor(
		title: string,
		message: string | undefined = undefined,
		constraints: InputConstraints = { type: 'number' },
	) {
		super(title, constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (typeof value != 'bigint') {
				this.pushError(errors, this.message || `${this.title} debe ser un número bigint`);
			}
		});
	}

	map(src: any): any {
		if (src == null || src == '') return null;
		return BigInt(src);
	}
	required(message?: string): BigintValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value === '') {
				this.pushError(errors, message || `${this.title} es requerido`);
			}
		});
		return this;
	}
}

export class DateValidator extends FieldValidator {
	constructor(
		title: string,
		message: string | undefined = undefined,
		constraints: InputConstraints = { type: 'date' },
	) {
		super(title, constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			const isValid = !isNaN(+new Date(value));
			if (!isValid) {
				this.pushError(errors, message || `${this.title} debe ser una fecha`);
			}
		});
	}
	map(src: string) {
		if (src == null) return null;
		return new Date(src);
	}
	required(message?: string): DateValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value == '') {
				this.pushError(errors, message || `${this.title} es requerido`);
			}
		});
		return this;
	}
}

export class TimeValidator extends FieldValidator {
	constructor(
		title: string,
		message: string | undefined = undefined,
		withSeconds: boolean = false,
		constraints: InputConstraints = { type: 'time' },
	) {
		super(title, constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			const isValid = (withSeconds ? reTimeSS : reTimeMM).test(value);
			if (!isValid) {
				this.pushError(errors, message || `${this.title} debe ser una hora`);
			}
		});
	}
	map(src: string) {
		if (src == null) return null;
		return src.toString();
	}
	required(message?: string): TimeValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value == '') {
				this.pushError(errors, message || `${this.title} es requerido`);
			}
		});
		return this;
	}
}

export class DateTimeValidator extends FieldValidator {
	constructor(
		title: string,
		message: string | undefined = undefined,
		constraints: InputConstraints = { type: 'datetime' },
	) {
		super(title, constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			const isValid = !isNaN(+new Date(value));
			if (!isValid) {
				this.pushError(errors, message || `${this.title} debe ser una fecha y hora`);
			}
		});
	}
	map(src: string) {
		if (src == null) return null;
		return new Date(src);
	}
	required(message?: string): DateTimeValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value == null || value == '') {
				this.pushError(errors, message || `${this.title} es requerido`);
			}
		});
		return this;
	}
}

export class BooleanValidator extends FieldValidator {
	constructor(
		title: string,
		message: string | undefined = undefined,
		constraints: InputConstraints = { type: 'checkbox' },
	) {
		super(title, constraints, message);
		this.validators.push((errors, value) => {
			if (value == null) return;
			if (typeof value !== 'boolean') {
				this.pushError(errors, message || `${this.title} debe ser booleano`);
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
	required(message?: string): BooleanValidator {
		this.constraints.required = true;
		this.validators.push((errors, value) => {
			if (value === null || value === undefined || value === '') {
				this.pushError(errors, message || `${this.title} es requerido`);
			}
		});
		return this;
	}
}

export type SchemaDefinition<T extends {}> = {
	[P in keyof T]: FieldValidator;
};

export class Schema<T extends {}, V extends SchemaDefinition<T>> {
	constructor(readonly def: V) {
		Object.entries(def).forEach(([key, val]) => {
			(val as FieldValidator).setName(key);
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
	field<Use extends UseInput | UseSelect | UseTextArea>(
		cb: (def: V, e: Writable<string>, d?: Writable<boolean>) => Use,
	): { error: Writable<string>; dirty: Writable<boolean>; use: Use } {
		const error = this.error();
		const dirty = this.dirty();
		return { error, dirty, use: cb(this.def, error, dirty) };
	}
	flatErrors(errors?: ValidatorErrors | null): string[] | null {
		return errors ? Object.values(errors).reduce((prev, curr) => [...prev, ...curr], []) : null;
	}
}

export function valNumber(title: string, message?: string | null): NumberValidator {
	return new NumberValidator(title, message || undefined);
}
export function valBigint(title: string, message?: string | null): BigintValidator {
	return new BigintValidator(title, message || undefined);
}
export function valString(title: string, message?: string | null): StringValidator {
	return new StringValidator(title, message || undefined);
}
export function valDate(title: string, message?: string | null): DateValidator {
	return new DateValidator(title, message || undefined);
}
export function valTime(
	title: string,
	message?: string | null,
	withSeconds: boolean = false,
): TimeValidator {
	return new TimeValidator(title, message || undefined, withSeconds);
}
export function valDateTime(title: string, message?: string | null): DateTimeValidator {
	return new DateTimeValidator(title, message || undefined);
}
export function valBoolean(title: string, message?: string | null): BooleanValidator {
	return new BooleanValidator(title, message || undefined);
}

export function hasErrorFromList(src: string[]): boolean {
	return src.filter(Boolean).length > 0;
}
export function hasDirtyFromList(src: boolean[]): boolean {
	return src.filter(Boolean).length > 0;
}
