export type ClsValue = string | number | undefined | null;
export type ClsMapping = {
    [key: string]: any;
};
export type ClsArgument = ClsValue | ClsMapping | ClsArgument[];
export declare function classnames(...args: ClsArgument[]): string;
