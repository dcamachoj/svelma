import type { Readable } from 'svelte/store';
export type Function = (value: any) => boolean;
export type MessageFunction = (value: any) => string;
export type Message = string | MessageFunction;
export type DirtyCheck = (value: any, dirty: boolean) => boolean;
export type ActionResult = {
    update(value: any): void;
};
export type ActionFunction = (node: HTMLElement, binding: any) => ActionResult;
export interface ActionInterface {
    setDirty(value: boolean): void;
}
export type Action = ActionInterface & {
    use: ActionFunction;
    input: SmuiActionFunction;
};
export type SmuiActionFunction = (node: HTMLElement) => {
    destroy: () => void;
};
export interface Result {
    dirty: boolean;
    valid: boolean;
    message?: string;
    value?: any;
}
export interface IValidator {
    validate(value: any): boolean;
    message(value: any): string;
}
export type ValidatorStore = Readable<Result>;
export declare function nop(): void;
export declare class Validator {
    private _validate;
    private _message;
    constructor(_validate: Function, _message?: Message);
    validate(value: any): boolean;
    message(value: any): string;
}
export declare const Val: {
    field: typeof createFieldInputValidator;
    isDirty(...results: Result[]): boolean;
    isValid(...results: Result[]): boolean;
    required: (message?: Message) => Validator;
    notEmpty: (message?: Message) => Validator;
    email: (message?: Message) => Validator;
    typeOf: (vType: string, message?: Message) => Validator;
    isArray: (message?: Message) => Validator;
    ne: (actual: () => any, message?: Message) => Validator;
    gt: (min: number, message?: Message) => Validator;
    ge: (min: number, message?: Message) => Validator;
    lt: (max: number, message?: Message) => Validator;
    le: (max: number, message?: Message) => Validator;
    between: (min: number, max: number, message?: Message) => Validator;
    regExp: (re: RegExp, message?: Message) => Validator;
};
declare function createFieldInputValidator(...validators: IValidator[]): [ValidatorStore, Action];
export {};
