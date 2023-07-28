import type { app } from '$lib/types/index.js';

export interface LangGetter {
	getLang(): string;
}

export interface LangSetter {
	setLang(value: string): PromiseLike<void> | void;
}

export interface I18nGetter {
	getI18nData(lang: string): PromiseLike<app.I18nData>;
}

export class I18n {
	private readonly data: app.I18nData = {};
	private _lang: string = '';

	get lang(): string {
		return this._lang;
	}
	has(key: string): boolean {
		return this.data.hasOwnProperty(key);
	}
	merge(lang: string, data: app.I18nData): I18n {
		this._lang = lang;
		Object.entries(data).forEach(([key, val]) => {
			this.data[key] = val;
		});
		return this;
	}
	load(data: Record<string, app.I18nLang>): I18n {
		Object.entries(data).forEach(([key, val]) => {
			const lang = this._lang as keyof app.I18nLang;
			this.data[key] = val[lang];
		});
		return this;
	}

	toString(key: string, params?: app.I18nParams): string {
		let value = this.has(key) ? this.data[key] : key.toUpperCase();
		if (!params) {
			return value;
		}
		Object.entries(params).forEach(([key, val]) => {
			value = value.replace(`{${key.toUpperCase()}}`, `${val}`);
		});
		return value;
	}

	translate<S extends { [key: string]: app.I18nParams }, R extends Record<keyof S, string>>(
		src: S
	): R {
		const data: Record<string, string> = {};
		Object.entries(src).forEach(([key, param]) => {
			data[key] = this.toString(key);
		});
		return data as R;
	}

	clone(): I18n {
		const copy = new I18n();
		copy._lang = this._lang;
		Object.entries(this.data).forEach(([key, val]) => {
			copy.data[key] = val;
		});
		return copy;
	}
}

export const i18n = new I18n();

export async function initI18n(langGetter: LangGetter, i18nGetter: I18nGetter): Promise<I18n> {
	const lang = langGetter.getLang();
	const data = await i18nGetter.getI18nData(lang);
	i18n.merge(lang, data);
	return i18n;
}

export function prefixLang(
	prefix: string,
	src: Record<string, app.I18nLang>
): Record<string, app.I18nLang> {
	const result: Record<string, app.I18nLang> = {};
	Object.entries(src).forEach(([key, val]) => {
		result[`${prefix}_${key}`] = val;
	});
	return result;
}
