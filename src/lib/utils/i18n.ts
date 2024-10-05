export interface I18nLang {
	en: string;
	es: string;
}
export type I18nData = { [key: string]: string };
export type I18nParams = { [key: string]: any };
export interface I18nValue {
	key: string;
	getValue(params?: I18nParams): string;
}

export interface LangGetter {
	getLang(): string;
}

export interface LangSetter {
	setLang(value: string): PromiseLike<void> | void;
}

export interface I18nGetter {
	getI18nData(lang: string): PromiseLike<I18nData>;
}

export class I18n {
	private readonly data: I18nData = {};
	private _lang: string = '';

	get lang(): string {
		return this._lang;
	}
	get loaded(): boolean {
		return Object.keys(this.data).length > 0;
	}
	has(key: string): boolean {
		return this.data.hasOwnProperty(key);
	}
	merge(lang: string, data: I18nData): I18n {
		this._lang = lang;
		Object.entries(data).forEach(([key, val]) => {
			this.data[key] = val;
		});
		return this;
	}
	load(data: Record<string, I18nLang>): I18n {
		Object.entries(data).forEach(([key, val]) => {
			const lang = this._lang as keyof I18nLang;
			this.data[key] = val[lang];
		});
		return this;
	}

	toString(key: string, params?: I18nParams): string {
		if (!this.loaded) return '';
		let value = this.has(key) ? this.data[key] : key.toUpperCase();
		if (!params) {
			return value;
		}
		Object.entries(params).forEach(([key, val]) => {
			value = value.replaceAll(`{${key.toUpperCase()}}`, `${val}`);
		});
		return value;
	}

	translate<S extends { [key: string]: I18nParams }, R extends Record<keyof S, string>>(src: S): R {
		const data: Record<string, string> = {};
		Object.entries(src).forEach(([key, param]) => {
			data[key] = this.toString(key, param);
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
	src: Record<string, I18nLang>
): Record<string, I18nLang> {
	const result: Record<string, I18nLang> = {};
	Object.entries(src).forEach(([key, val]) => {
		result[`${prefix}_${key}`] = val;
	});
	return result;
}
