import type { app } from '$lib/types/index.js';
import type { I18nGetter, LangGetter, LangSetter } from './i18n.js';

const browser = typeof window !== 'undefined';

function getCookie(name: string): string {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	return parts.length === 2 ? parts.pop()!!.split(';').shift() ?? '' : '';
}

function setCookie(name: string, value: string, days: number = 0) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export class CompositeLangGetter implements LangGetter {
	constructor(private readonly children: LangGetter[]) {}
	getLang(): string {
		for (let getter of this.children) {
			const result = getter.getLang();
			if (result) return result;
		}
		return '';
	}
}

export class BrowserLangGetter implements LangGetter {
	getLang(): string {
		if (!browser) return '';
		return (navigator.language || (navigator as any).userLanguage).split(',')[0].split('-')[0];
	}
}

export class CookieLangGetter implements LangGetter {
	getLang(): string {
		if (!browser) return '';
		return getCookie('lang');
	}
}

export class StorageGetter implements LangGetter {
	constructor(private readonly storage: Storage) {}
	getLang(): string {
		if (!browser) return '';
		return this.storage.getItem('lang') || '';
	}
}

export class CookieLangSetter implements LangSetter {
	constructor(private readonly days: number = 0) {}
	setLang(value: string): PromiseLike<void> | void {
		if (browser) {
			setCookie('lang', value, this.days);
		}
	}
}

export class StorageLangSetter implements LangSetter {
	constructor(private readonly storage: Storage) {}
	setLang(value: string): void | PromiseLike<void> {
		if (browser) {
			this.storage.setItem('lang', value);
		}
	}
}

export class StaticI18nGetter implements I18nGetter {
	constructor(private readonly data: Record<string, app.I18nData>) {}
	getI18nData(lang: string): PromiseLike<app.I18nData> {
		return Promise.resolve(this.data[lang] || {});
	}
}

export class StaticI18nLangsGetter implements I18nGetter {
	constructor(private readonly data: Record<string, app.I18nLang>) {}
	getI18nData(lang: string): PromiseLike<app.I18nData> {
		const data: app.I18nData = {};
		Object.entries(this.data).forEach(([key, val]) => {
			const kLang = lang as keyof app.I18nLang;
			data[key] = val[kLang];
		});
		return Promise.resolve(data);
	}
}

export class FetchI18nGetter implements I18nGetter {
	constructor(
		private fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
		private readonly urlGetter: (lang: string) => string
	) {}
	getI18nData(lang: string): PromiseLike<app.I18nData> {
		return this.fetch(this.urlGetter(lang)).then((res) => {
			if (res.ok) return res.json();
			return Promise.reject(res.statusText);
		});
	}
}
