import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { i18n } from './i18n.js';

const reEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type ValidatorStore = Readable<val.Result>;
export function nop() {}

export class Validator {
	constructor(private _validate: val.Function, private _message: val.Message = '*') {}
	validate(value: any): boolean {
		return this._validate(value);
	}
	message(value: any): string {
		return typeof this._message === 'function' ? this._message(value) : this._message;
	}
}

export const Val = {
	field: createFieldInputValidator,
	isDirty(...results: val.Result[]): boolean {
		return results.some((it) => it.dirty);
	},
	isValid(...results: val.Result[]): boolean {
		return !results.find((it) => !it.valid);
	},
	required: (message?: val.Message) =>
		new Validator(
			(v) => v !== undefined && v !== null,
			message || i18n.toString('validator_required')
		),
	notEmpty: (message?: val.Message) =>
		new Validator(
			(v) => v !== undefined && v !== null && v !== '',
			message || i18n.toString('validator_empty')
		),
	email: (message?: val.Message) =>
		new Validator(
			(v) => v && reEmail.test(v.toString()),
			message || i18n.toString('validator_email_not_valid')
		),
	typeOf: (vType: string, message?: val.Message) =>
		new Validator(
			(v) => v === null || v === undefined || typeof v === vType,
			message || ((v) => i18n.toString('validator_type_of', { expected: vType, actual: typeof v }))
		),
	isArray: (message?: val.Message) =>
		new Validator((v) => Array.isArray(v), message || i18n.toString('validator_array')),
	ne: (actual: () => any, message?: val.Message) =>
		new Validator(
			(v) => v != actual(),
			message || ((v) => i18n.toString('validator_ne', { actual: actual() }))
		),
	gt: (min: number, message?: val.Message) =>
		new Validator(
			(v) => typeof v !== 'number' || v > min,
			message || ((v) => i18n.toString('validator_gt', { min }))
		),
	ge: (min: number, message?: val.Message) =>
		new Validator(
			(v) => typeof v !== 'number' || v >= min,
			message || ((v) => i18n.toString('validator_ge', { min }))
		),
	lt: (max: number, message?: val.Message) =>
		new Validator(
			(v) => typeof v !== 'number' || v < max,
			message || ((v) => i18n.toString('validator_lt', { max }))
		),
	le: (max: number, message?: val.Message) =>
		new Validator(
			(v) => typeof v !== 'number' || v <= max,
			message || ((v) => i18n.toString('validator_le', { max }))
		),
	between: (min: number, max: number, message?: val.Message) =>
		new Validator(
			(v) => typeof v !== 'number' || (v >= min && v <= max),
			message || ((v) => i18n.toString('validator_between', { min, max }))
		),
	regExp: (re: RegExp, message?: val.Message) =>
		new Validator(
			(v) => typeof v !== 'string' || re.test(`${v}`),
			message || i18n.toString('validator_not_valid')
		)
};

class ValAction {
	private _validator: (value: any, dirty: boolean) => val.Result;
	public dirty: boolean = false;
	private _last: any;
	public node: HTMLElement | null = null;

	constructor(private _set: (value: val.Result) => void, validators: val.IValidator[]) {
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

function createFieldInputValidator(...validators: val.IValidator[]): [ValidatorStore, val.Action] {
	const { subscribe, set } = writable<val.Result>({
		dirty: false,
		valid: false,
		message: undefined
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
			}
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
			input: sInput
		}
	];
}

function buildValidator(validators: val.IValidator[]): (value: any, dirty: boolean) => val.Result {
	return function validate(value: any, dirty: boolean): val.Result {
		if (!validators || validators.length === 0) {
			return { dirty, valid: true };
		}

		const failing = validators.find((v) => !v.validate(value));

		return {
			dirty,
			valid: !failing,
			message: failing ? failing.message(value) : undefined
		};
	};
}
