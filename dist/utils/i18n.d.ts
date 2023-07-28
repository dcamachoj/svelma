import type { app } from '../types/index.js';
export interface LangGetter {
    getLang(): string;
}
export interface LangSetter {
    setLang(value: string): PromiseLike<void> | void;
}
export interface I18nGetter {
    getI18nData(lang: string): PromiseLike<app.I18nData>;
}
export declare class I18n {
    private readonly data;
    private _lang;
    get lang(): string;
    has(key: string): boolean;
    merge(lang: string, data: app.I18nData): I18n;
    load(data: Record<string, app.I18nLang>): I18n;
    toString(key: string, params?: app.I18nParams): string;
    translate<S extends {
        [key: string]: app.I18nParams;
    }, R extends Record<keyof S, string>>(src: S): R;
    clone(): I18n;
}
export declare const i18n: I18n;
export declare function initI18n(langGetter: LangGetter, i18nGetter: I18nGetter): Promise<I18n>;
export declare function prefixLang(prefix: string, src: Record<string, app.I18nLang>): Record<string, app.I18nLang>;
