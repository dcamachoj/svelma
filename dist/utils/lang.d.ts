import type { app } from '../types/index.js';
import type { I18nGetter, LangGetter, LangSetter } from './i18n.js';
export declare class CompositeLangGetter implements LangGetter {
    private readonly children;
    constructor(children: LangGetter[]);
    getLang(): string;
}
export declare class BrowserLangGetter implements LangGetter {
    getLang(): string;
}
export declare class CookieLangGetter implements LangGetter {
    getLang(): string;
}
export declare class StorageGetter implements LangGetter {
    private readonly storage;
    constructor(storage: Storage);
    getLang(): string;
}
export declare class CookieLangSetter implements LangSetter {
    private readonly days;
    constructor(days?: number);
    setLang(value: string): PromiseLike<void> | void;
}
export declare class StorageLangSetter implements LangSetter {
    private readonly storage;
    constructor(storage: Storage);
    setLang(value: string): void | PromiseLike<void>;
}
export declare class StaticI18nGetter implements I18nGetter {
    private readonly data;
    constructor(data: Record<string, app.I18nData>);
    getI18nData(lang: string): PromiseLike<app.I18nData>;
}
export declare class StaticI18nLangsGetter implements I18nGetter {
    private readonly data;
    constructor(data: Record<string, app.I18nLang>);
    getI18nData(lang: string): PromiseLike<app.I18nData>;
}
export declare class FetchI18nGetter implements I18nGetter {
    private fetch;
    private readonly urlGetter;
    constructor(fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>, urlGetter: (lang: string) => string);
    getI18nData(lang: string): PromiseLike<app.I18nData>;
}
