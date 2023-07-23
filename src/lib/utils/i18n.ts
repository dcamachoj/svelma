export interface LangGetter {
	getLang(): string;
}

export interface LangSetter {
	setLang(value: string): PromiseLike<void> | void;
}

export interface I18nGetter {
	getI18nData(lang: string): PromiseLike<app.I18nData>;
}

class I18n {
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
}

export const i18n = new I18n();

export async function initI18n(langGetter: LangGetter, i18nGetter: I18nGetter): Promise<I18n> {
	const lang = langGetter.getLang();
	const data = await i18nGetter.getI18nData(lang);
	i18n.merge(lang, data);
	return i18n;
}
