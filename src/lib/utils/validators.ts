import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { i18n } from './i18n.js';

export type Function = (value: any) => boolean;
export type MessageFunction = (value: any) => string;
export type Message = string | MessageFunction;
export type DirtyCheck = (value: any, dirty: boolean) => boolean;
export type ActionResult = {
	update(value: any): void;
};
export type ActionFunction = (node: HTMLElement, binding: any) => ActionResult;
export interface ActionInterface {
	setDirty(value: boolean): void;
}
export type Action = ActionInterface & {
	use: ActionFunction;
	input: SmuiActionFunction;
};
export type SmuiActionFunction = (node: HTMLElement) => {
	destroy: () => void;
};
export interface Result {
	dirty: boolean;
	valid: boolean;
	message?: string;
	value?: any;
}
export interface IValidator {
	validate(value: any): boolean;
	message(value: any): string;
}

export function getNopAction(): Action {
	return {
		setDirty(value: boolean) {},
		use: getNopUse(),
		input: getNopInput(),
	};
}

export function getNopInput(): SmuiActionFunction {
	return (node: HTMLElement) => ({
		destroy() {},
	});
}

export function getNopUse(): ActionFunction {
	return (node: HTMLElement, binding: any) => ({
		update(value: any) {},
	});
}

export function isAnyError(...errors: string[]) {
	return errors.some((e) => e);
}

export function isAllError(...errors: string[]) {
	return errors.every((e) => e);
}

export function isSomeDirty(...dirties: boolean[]) {
	return dirties.some((d) => d);
}

export function isAllDirty(...dirties: boolean[]) {
	return dirties.every((d) => d);
}

const reEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type ValidatorStore = Readable<Result>;
export function nop() {}

export class Validator {
	constructor(
		private _validate: Function,
		private _message: Message = '*',
	) {}
	validate(value: any): boolean {
		return this._validate(value);
	}
	message(value: any): string {
		return typeof this._message === 'function' ? this._message(value) : this._message;
	}
}

export const Val = {
	field: createFieldInputValidator,
	isDirty(...results: Result[]): boolean {
		return results.some((it) => it.dirty);
	},
	isValid(...results: Result[]): boolean {
		return !results.find((it) => !it.valid);
	},
	required: (message?: Message) =>
		new Validator(
			(v) => v !== undefined && v !== null,
			message || i18n.toString('validator_required'),
		),
	notEmpty: (message?: Message) =>
		new Validator(
			(v) => v !== undefined && v !== null && v !== '',
			message || i18n.toString('validator_empty'),
		),
	email: (message?: Message) =>
		new Validator(
			(v) => v && reEmail.test(v.toString()),
			message || i18n.toString('validator_email_not_valid'),
		),
	typeOf: (vType: string, message?: Message) =>
		new Validator(
			(v) => v === null || v === undefined || typeof v === vType,
			message || ((v) => i18n.toString('validator_type_of', { expected: vType, actual: typeof v })),
		),
	isArray: (message?: Message) =>
		new Validator((v) => Array.isArray(v), message || i18n.toString('validator_array')),
	allowedChars: (validChars: string, message?: Message) =>
		new Validator(
			(v: any) =>
				(v.toString() as string).split('').some((c) => validChars.indexOf(c) == -1) == false,
			message || ((v) => i18n.toString('validator_allowed_chars', { validChars })),
		),
	ne: (actual: () => any, message?: Message) =>
		new Validator(
			(v) => v != actual(),
			message || ((v) => i18n.toString('validator_ne', { actual: actual() })),
		),
	gt: (min: number, message?: Message) =>
		new Validator(
			(v) => typeof v !== 'number' || v > min,
			message || ((v) => i18n.toString('validator_gt', { min })),
		),
	ge: (min: number, message?: Message) =>
		new Validator(
			(v) => typeof v !== 'number' || v >= min,
			message || ((v) => i18n.toString('validator_ge', { min })),
		),
	lt: (max: number, message?: Message) =>
		new Validator(
			(v) => typeof v !== 'number' || v < max,
			message || ((v) => i18n.toString('validator_lt', { max })),
		),
	le: (max: number, message?: Message) =>
		new Validator(
			(v) => typeof v !== 'number' || v <= max,
			message || ((v) => i18n.toString('validator_le', { max })),
		),
	between: (min: number, max: number, message?: Message) =>
		new Validator(
			(v) => typeof v !== 'number' || (v >= min && v <= max),
			message || ((v) => i18n.toString('validator_between', { min, max })),
		),
	regExp: (re: RegExp, message?: Message) =>
		new Validator(
			(v) => typeof v !== 'string' || re.test(`${v}`),
			message || i18n.toString('validator_not_valid'),
		),
};

class ValAction {
	private _validator: (value: any, dirty: boolean) => Result;
	public dirty: boolean = false;
	private _last: any;
	public node: HTMLElement | null = null;

	constructor(
		private _set: (value: Result) => void,
		validators: IValidator[],
	) {
		this._validator = buildValidator(validators);
		this.dirtyCheck = this.dirtyCheck.bind(this);
		this.validate = this.validate.bind(this);
		this.update = this.update.bind(this);
		this.setDirty = this.setDirty.bind(this);
	}

	setDirty(value: boolean) {
		this.dirty = value;
		this.validate(this._last);
	}
	dirtyCheck(value: any, dirty: boolean): boolean {
		return !dirty && value !== undefined && value !== null;
	}
	validate(value: any) {
		this._last = value;
		const result = this._validator(value, this.dirty);
		result.value = value;
		this._set(result);
	}
	update(value: any) {
		if (this.dirtyCheck(value, this.dirty)) {
			this.dirty = true;
		}
		this.validate(value);
	}
}

function createFieldInputValidator(...validators: IValidator[]): [ValidatorStore, Action] {
	const { subscribe, set } = writable<Result>({
		dirty: false,
		valid: false,
		message: undefined,
	});
	const valAction = new ValAction(set, validators);

	function action(node: HTMLElement, binding: any) {
		valAction.node = node;
		valAction.validate(binding);
		return valAction;
	}

	function sInput(node: HTMLElement) {
		const input: HTMLInputElement | null =
			node.tagName === 'INPUT' ? (node as HTMLInputElement) : node.querySelector('input');
		input?.addEventListener('input', onChange);
		return {
			destroy() {
				input?.removeEventListener('input', onChange);
			},
		};
		function onChange(e: Event) {
			const value = (e.target as HTMLInputElement).value;
			if (input) {
				action(input, value);
			}
		}
	}

	return [
		{ subscribe },
		{
			setDirty: valAction.setDirty,
			use: action,
			input: sInput,
		},
	];
}

function buildValidator(validators: IValidator[]): (value: any, dirty: boolean) => Result {
	return function validate(value: any, dirty: boolean): Result {
		if (!validators || validators.length === 0) {
			return { dirty, valid: true };
		}

		const failing = validators.find((v) => !v.validate(value));

		return {
			dirty,
			valid: !failing,
			message: failing ? failing.message(value) : undefined,
		};
	};
}
