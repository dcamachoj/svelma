export interface I18nLang {
    en: string;
    es: string;
}
export type I18nData = {
    [key: string]: string;
};
export type I18nParams = {
    [key: string]: any;
};
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
export declare class I18n {
    private readonly data;
    private _lang;
    get lang(): string;
    get loaded(): boolean;
    has(key: string): boolean;
    merge(lang: string, data: I18nData): I18n;
    load(data: Record<string, I18nLang>): I18n;
    toString(key: string, params?: I18nParams): string;
    translate<S extends {
        [key: string]: I18nParams;
    }, R extends Record<keyof S, string>>(src: S): R;
    clone(): I18n;
}
export declare const i18n: I18n;
export declare function initI18n(langGetter: LangGetter, i18nGetter: I18nGetter): Promise<I18n>;
export declare function prefixLang(prefix: string, src: Record<string, I18nLang>): Record<string, I18nLang>;
