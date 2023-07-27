import type { Readable } from 'svelte/store';
import type { val } from '../types/index.js';
export type ValidatorStore = Readable<val.Result>;
export declare function nop(): void;
export declare class Validator {
    private _validate;
    private _message;
    constructor(_validate: val.Function, _message?: val.Message);
    validate(value: any): boolean;
    message(value: any): string;
}
export declare const Val: {
    field: typeof createFieldInputValidator;
    isDirty(...results: val.Result[]): boolean;
    isValid(...results: val.Result[]): boolean;
    required: (message?: val.Message) => Validator;
    notEmpty: (message?: val.Message) => Validator;
    email: (message?: val.Message) => Validator;
    typeOf: (vType: string, message?: val.Message) => Validator;
    isArray: (message?: val.Message) => Validator;
    ne: (actual: () => any, message?: val.Message) => Validator;
    gt: (min: number, message?: val.Message) => Validator;
    ge: (min: number, message?: val.Message) => Validator;
    lt: (max: number, message?: val.Message) => Validator;
    le: (max: number, message?: val.Message) => Validator;
    between: (min: number, max: number, message?: val.Message) => Validator;
    regExp: (re: RegExp, message?: val.Message) => Validator;
};
declare function createFieldInputValidator(...validators: val.IValidator[]): [ValidatorStore, val.Action];
export {};
