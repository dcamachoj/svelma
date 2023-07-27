declare class Formatter {
    clamp(value: number, min: number, max: number): number;
    dateString(date: Date | undefined, offset?: number): string | undefined;
    timeString(date: Date | undefined, offset?: number): string | undefined;
    floatString(value: number | undefined): string | undefined;
    floatString1(value: number | undefined): string | undefined;
    intString(value: number | undefined): string | undefined;
    boolString(value: boolean | undefined, { ok, no }?: {
        ok: string;
        no: string;
    }): string | undefined;
}
export declare const formatter: Formatter;
export {};
