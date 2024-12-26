import type { I18n, I18nParams } from './i18n.js';
import { Logger } from './logger.js';

const valPrefix = 'form_schema';
const reEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const reTimeMM = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$/;
const reTimeSS = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
const reUrl =
	/[a-z]+:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const formSchemaTranslationsPrefix = `${valPrefix}_`;

export type FormInputConstraintsType =
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
export type FormTypeOf =
	| 'string'
	| 'number'
	| 'bigint'
	| 'boolean'
	| 'symbol'
	| 'undefined'
	| 'object'
	| 'function';

export type FormInputConstraints = {
	type?: FormInputConstraintsType;
	required?: boolean;
	maxlength?: number;
	min?: number;
	max?: number;
	pattern?: string;
	step?: string | number;
};

export type FormError = {
	message: string;
	params?: I18nParams;
};
export type FormFieldValidation = {
	value?: any;
	error?: FormError;
};
export type FormFieldOptions = {
	constraints: FormInputConstraints;
	custom?: FormValidateFunction;
};
export type FormStringOptions = FormFieldOptions & {
	trim: boolean;
};
export type FormValidateFunction = (value: FormFieldValidation) => void;

export abstract class FormField {
	protected patternName: String = 'pattern';
	id: string = '';

	constructor(readonly options: FormFieldOptions) {
		[
			'validateCustom',
			'validateRequired',
			'validateMaxLength',
			'validateMin',
			'validateMax',
			'validateRegExp',
			'validatePattern',
			'validateEmail',
			'validateUrl',
			'validateTimeMM',
			'validateTimeSS',
		].forEach((fn) => ((this as any)[fn] = (this as any)[fn].bind(this)));
	}

	/**
	 * Validate field
	 * @param value Field Value already mapped by field
	 * @param target   Save Form Data into target object
	 * @returns Error if any
	 */
	abstract validate(value: FormFieldValidation): void;

	/**
	 * Input Propperties
	 */
	get inputProps() {
		return {
			id: this.id,
			name: this.id,
			...this.options.constraints,
		};
	}

	labelText(i18n: I18n, prefix: string = ''): string {
		return i18n.s(`field_${prefix}${this.id}`);
	}

	protected validateChain(value: FormFieldValidation, ...chain: FormValidateFunction[]) {
		this.validateValue(value);
		if (value.error != null) return;
		for (let fn of chain) {
			fn(value);
			if (value.error != null) return;
		}
		this.validateCustom(value);
	}
	protected validateValue(value: FormFieldValidation) {}
	protected validateRequired(value: FormFieldValidation): void {
		if (!this.options.constraints.required || value.value != null) return;
		value.error = {
			message: `${valPrefix}_required`,
		};
	}
	protected validateMaxLength(value: FormFieldValidation) {
		const maxlength = this.options.constraints.maxlength;
		if (maxlength == null) return;
		if (value.value == null || typeof value.value != 'string') return;
		const str = value.value.toString();
		if (str.length <= maxlength) return;
		value.error = {
			message: `${valPrefix}_max_length`,
			params: { maxlength },
		};
	}
	protected validatePattern(value: FormFieldValidation) {
		const pattern = this.options.constraints.pattern;
		if (pattern == null) return;
		if (value.value == null || typeof value.value != 'string') return;
		const str = value.value.toString();
		const re = new RegExp(pattern);
		if (re.test(str)) return;
		value.error = {
			message: `${valPrefix}_${this.patternName}_not_valid`,
			params: { pattern },
		};
	}
	protected validateMin(value: FormFieldValidation) {
		const min = this.options.constraints.min;
		if (min == null || value.value == null) return;
		const num = +value.value;
		if (num == null) return;
		if (num >= min) return;
		value.error = {
			message: `${valPrefix}_ge`,
			params: { min },
		};
	}
	protected validateMax(value: FormFieldValidation) {
		const max = this.options.constraints.max;
		if (max == null || value.value == null) return;
		const num = +value.value;
		if (num == null) return;
		if (num <= max) return;
		value.error = {
			message: `${valPrefix}_le`,
			params: { max },
		};
	}
	protected validateRegExp(
		re: RegExp,
		constraintType?: FormInputConstraintsType,
	): FormValidateFunction {
		return (value) => {
			if (constraintType != null && this.options.constraints.type != constraintType) return;
			if (value?.value == null) return;
			const str = value.value.toString();
			if (re.test(str)) return;
			value.error = {
				message: `${valPrefix}_${constraintType}_not_valid`,
			};
		};
	}
	protected validateEmail(value: FormFieldValidation) {
		return this.validateRegExp(reEmail, 'email')(value);
	}
	protected validateUrl(value: FormFieldValidation) {
		return this.validateRegExp(reUrl, 'url')(value);
	}
	protected validateTimeMM(value: FormFieldValidation) {
		return this.validateRegExp(reTimeMM, 'time')(value);
	}
	protected validateTimeSS(value: FormFieldValidation) {
		return this.validateRegExp(reTimeSS, 'time')(value);
	}
	protected validateCustom(value: FormFieldValidation) {
		if (typeof this.options.custom != 'function') return;
		return this.options.custom(value);
	}
}

export class FormStringField extends FormField {
	private _trim = false;
	private _allowEmpty = false;
	constructor() {
		super({ constraints: { type: 'text' } });
	}

	validate(value: FormFieldValidation): void {
		this.validateChain(
			value,
			this.validateRequired,
			this.validateMaxLength,
			this.validateEmail,
			this.validateUrl,
			this.validatePattern,
		);
	}

	protected validateValue(value: FormFieldValidation): void {
		if (value.value == null) return;
		if (value.value == '' && !this._allowEmpty) {
			value.value = null;
			return;
		}
		value.value = value.value.toString();
		if (this._trim) {
			value.value = value.value.trim();
		}
	}

	required(value: boolean = true): FormStringField {
		this.options.constraints.required = value;
		return this;
	}

	trim(value: boolean = true): FormStringField {
		this._trim = value;
		return this;
	}

	allowEmpty(value: boolean = true): FormStringField {
		this._allowEmpty = value;
		return this;
	}

	maxLength(maxLength?: number): FormStringField {
		this.options.constraints.maxlength = maxLength;
		return this;
	}

	pattern(pattern?: string, patternName: string = 'pattern'): FormStringField {
		this.options.constraints.pattern = pattern;
		this.patternName = patternName;
		return this;
	}

	password(): FormStringField {
		this.options.constraints.type = 'password';
		return this;
	}

	email(): FormStringField {
		this.options.constraints.type = 'email';
		return this;
	}

	selectOne(): FormStringField {
		this.options.constraints.type == 'select-one';
		return this;
	}

	enum(enumName: string, ...values: string[]): FormStringField {
		this.options.constraints.pattern = values.join('|');
		this.patternName = enumName;
		return this;
	}
}

export class FormNumberField extends FormField {
	constructor() {
		super({ constraints: { type: 'number' } });
	}

	validate(value: FormFieldValidation) {
		this.validateChain(value, this.validateRequired, this.validateMin, this.validateMax);
	}

	protected validateValue(value: FormFieldValidation): void {
		if (value.value == null) return;
		if (value.value == '') {
			value.value = null;
			return;
		}
		try {
			value.value = +value.value;
			const isValid = !isNaN(value.value);
			if (isValid) return;
		} catch (e) {
			Logger.getInstance().debug(`Converting '${value.value}' to number. Error: ${e}`);
		}
		value.value = null;
		value.error = {
			message: `${valPrefix}_number_not_valid`,
		};
	}

	required(value?: boolean): FormNumberField {
		this.options.constraints.required = value;
		return this;
	}
	min(value?: number): FormNumberField {
		this.options.constraints.min = value;
		return this;
	}
	max(value?: number): FormNumberField {
		this.options.constraints.max = value;
		return this;
	}
	step(value?: number | string): FormNumberField {
		this.options.constraints.step = value;
		return this;
	}
}

export class FormBigIntField extends FormField {
	constructor() {
		super({ constraints: { type: 'text' } });
	}

	validate(value: FormFieldValidation) {
		this.validateChain(value, this.validateRequired);
	}

	protected validateValue(value: FormFieldValidation): void {
		if (value.value == null) return;
		if (value.value == '') {
			value.value = null;
			return;
		}
		try {
			value.value = BigInt(value.value);
		} catch (e) {
			Logger.getInstance().debug(`Converting '${value.value}' to bigint. Error: ${e}`);
			value.value = null;
			value.error = {
				message: `${valPrefix}_bigint_not_valid`,
			};
		}
	}

	required(value?: boolean): FormBigIntField {
		this.options.constraints.required = value;
		return this;
	}
}

export class FormDateField extends FormField {
	constructor() {
		super({ constraints: { type: 'date' } });
	}

	validate(value: FormFieldValidation) {
		this.validateChain(value, this.validateRequired);
	}

	protected validateValue(value: FormFieldValidation): void {
		if (value.value == null) return;
		if (value.value == '') {
			value.value = null;
			return;
		}
		try {
			value.value = new Date(value.value);
			const isValid = !isNaN(value.value);
			if (isValid) return;
		} catch (e) {
			Logger.getInstance().debug(`Converting '${value.value}' to date. Error: ${e}`);
		}
		value.value = null;
		value.error = {
			message: `${valPrefix}_date_not_valid`,
		};
	}

	required(value?: boolean): FormDateField {
		this.options.constraints.required = value;
		return this;
	}
}

export class FormTimeField extends FormField {
	constructor(readonly withSeconds: boolean = false) {
		super({ constraints: { type: 'time' } });
	}

	validate(value: FormFieldValidation): void {
		this.validateChain(
			value,
			this.validateRequired,
			this.withSeconds ? this.validateTimeSS : this.validateTimeMM,
		);
	}

	protected validateValue(value: FormFieldValidation): void {
		if (value.value == null) return;
		value.value = value.value.toString();
	}

	required(value?: boolean): FormTimeField {
		this.options.constraints.required = value;
		return this;
	}
}

export class FormDateTimeField extends FormField {
	constructor() {
		super({ constraints: { type: 'datetime' } });
	}

	validate(value: FormFieldValidation) {
		this.validateChain(value, this.validateRequired);
	}

	protected validateValue(value: FormFieldValidation): void {
		if (value.value == null) return;
		if (value.value == '') {
			value.value = null;
			return;
		}
		try {
			value.value = new Date(value.value);
			const isValid = !isNaN(value.value);
			if (isValid) return;
		} catch (e) {
			Logger.getInstance().debug(`Converting '${value.value}' to date. Error: ${e}`);
		}
		value.value = null;
		value.error = {
			message: `${valPrefix}_datetime_not_valid`,
		};
	}

	required(value?: boolean): FormDateTimeField {
		this.options.constraints.required = value;
		return this;
	}
}

export class FormCheckboxField extends FormField {
	constructor() {
		super({ constraints: { type: 'checkbox' } });
	}

	validate(value: FormFieldValidation): void {
		this.validateChain(value, this.validateRequired);
	}

	protected validateValue(value: FormFieldValidation): void {
		if (value.value === undefined) {
			value.value = false;
		} else if (value.value == 'on') {
			value.value = true;
		} else {
			Logger.getInstance().debug(`Converting '${value.value}' to checkbox`);
			value.error = {
				message: `${valPrefix}_checkbox_not_valid`,
			};
		}
	}

	required(value?: boolean): FormCheckboxField {
		this.options.constraints.required = value;
		return this;
	}
}

export class FormBooleanField extends FormField {
	constructor() {
		super({ constraints: {} }); // select
	}

	validate(value: FormFieldValidation): void {
		this.validateChain(value, this.validateRequired);
	}

	protected validateValue(value: FormFieldValidation): void {
		if (value.value == null) return;
		if (value.value == '') {
			value.value = null;
			return;
		}
		const str = value.value.toString();
		const isTrue = ['yes', 'on', 'true', '1'].some((s) => s === str);
		const isFalse = ['no', 'false', '0'].some((s) => s === str);
		if (!isTrue && !isFalse) {
			value.value = null;
			value.error = {
				message: `${valPrefix}_boolean_not_valid`,
			};
			return;
		}
		value.value = isTrue;
	}

	required(value?: boolean): FormBooleanField {
		this.options.constraints.required = value;
		return this;
	}
}
