import { injectable } from './injectable.js';

export type I18nLang = {
	[key: string]: symbol;
};
export type I18nData = { [key: string]: string };
export type I18nParams = { [key: string]: any };
export type I18nCallback = (i18n: I18n) => I18n;
export type I18nTranslation<T> = Record<keyof T, string>;

export const okEs = 'exitósamente';
export const okEn = 'successfully';
export const areYouSureEs = '¿Está seguro que desea';
export const areYouSureEn = 'Are you sure you want to';

export class I18n {
	private readonly data: I18nData = {};

	constructor(readonly lang: string) {}

	chain(...cbs: I18nCallback[]): I18n {
		let i18n: I18n = this;
		for (let cb of cbs) {
			i18n = cb(i18n);
		}
		return i18n;
	}
	has(key: string): boolean {
		return this.data.hasOwnProperty(key);
	}
	set(key: string, value: string) {
		this.data[key] = value;
	}
	merge(data: I18nData, prefix: string = ''): I18n {
		Object.entries(data).forEach(([key, val]) => {
			this.data[`${prefix}${key}`] = val;
		});
		return this;
	}
	s(key: string, params?: I18nParams): string {
		let value = this.has(key) ? this.data[key] : key;
		if (!params) {
			return value;
		}
		Object.entries(params).forEach(([key, val]) => {
			value = value.replaceAll(`{${key.toUpperCase()}}`, `${val}`);
		});
		return value;
	}
	clone(): I18n {
		const copy = new I18n(this.lang);
		Object.entries(this.data).forEach(([key, val]) => {
			copy.data[key] = val;
		});
		return copy;
	}
}

export class I18nLanguages {
	static readonly DI = Symbol.for('I18nLanguages');
	static getInstance(): I18nLanguages {
		return injectable.get(I18nLanguages.DI);
	}
	constructor(
		readonly defaultLang: string,
		readonly di: I18nLang,
	) {
		injectable.set(I18nLanguages.DI, this);
		if (!(defaultLang in di))
			throw new Error(`Default Language '${defaultLang}' not in [${Object.keys(di).join(',')}]`);
		Object.entries(di).forEach(([key, val]) => {
			const i18n = new I18n(key);
			injectable.set(val, i18n);
		});
	}

	getLanguage(lang: string): I18n {
		return injectable.get(this.di[lang] || this.di[this.defaultLang]);
	}

	findLanguage(lang: string): I18n | undefined {
		const di = this.di[lang];
		if (!di) return undefined;
		return injectable.get(di);
	}
}
