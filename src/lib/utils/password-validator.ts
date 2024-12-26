import {
	passwordValidatorTranslationsPrefix,
	type PasswordValidatorConfig,
	type PasswordValidity,
} from '$lib/data/password-validators.i18n.js';
import { I18n } from './i18n.js';

const reLower = /[a-zñ]/g;
const reUpper = /[A-ZÑ]/g;
const reDigit = /[0-9]/g;
const defaultSymbols = '!#$%&=,.;:-_+*';

export type PasswordRule = {
	valid: boolean;
	message: string;
};
export type PasswordRules = Record<keyof PasswordValidity, PasswordRule | undefined>;

export class PasswordValidator {
	constructor(readonly config: PasswordValidatorConfig) {
		if (config.min_symbols && !config.all_symbols) {
			config.all_symbols = defaultSymbols;
		}
	}

	private __countRe(re: RegExp, str: string): number {
		return (str.match(re) || []).length;
	}
	private __countSymbols(str: string): number {
		return str.split('').filter((s) => this.config.all_symbols!!.indexOf(s) >= 0).length;
	}
	private __checkMin(
		count: number,
		key: keyof Omit<PasswordValidatorConfig, 'all_symbols'>,
	): boolean | undefined {
		const cfg: number | undefined = this.config[key];
		if (cfg == null) return undefined;
		return count >= cfg;
	}
	private __checkMax(
		count: number,
		key: keyof Omit<PasswordValidatorConfig, 'all_symbols'>,
	): boolean | undefined {
		const cfg: number | undefined = this.config[key];
		if (cfg == null) return undefined;
		return count <= cfg;
	}
	private __rule(
		i18n: I18n,
		key: keyof PasswordValidity,
		valid?: boolean,
	): PasswordRule | undefined {
		if (valid == undefined) return undefined;
		return {
			valid,
			message: i18n.s(passwordValidatorTranslationsPrefix + key, this.config),
		};
	}
	validate(value: string): PasswordValidity {
		return {
			min_length: this.__checkMin(value.length, 'min_length')!!,
			max_length: this.__checkMax(value.length, 'max_length'),
			min_lower: this.__checkMin(this.__countRe(reLower, value), 'min_lower'),
			min_upper: this.__checkMin(this.__countRe(reUpper, value), 'min_upper'),
			min_digits: this.__checkMin(this.__countRe(reDigit, value), 'min_digits'),
			min_symbols: this.__checkMin(this.__countSymbols(value), 'min_symbols'),
		};
	}
	rules(value: string, i18n: I18n): PasswordRules {
		const valid = this.validate(value);
		return {
			min_length: this.__rule(i18n, 'min_length', valid.min_length),
			max_length: this.__rule(i18n, 'max_length', valid.max_length),
			min_lower: this.__rule(i18n, 'min_lower', valid.min_lower),
			min_upper: this.__rule(i18n, 'min_upper', valid.min_upper),
			min_digits: this.__rule(i18n, 'min_digits', valid.min_digits),
			min_symbols: this.__rule(i18n, 'min_symbols', valid.min_symbols),
		};
	}
}
