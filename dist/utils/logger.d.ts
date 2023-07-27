declare class Logger {
    _level: number;
    constructor();
    _canLog(level: number): boolean;
    error(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
}
export declare const logger: Logger;
export declare function initLogger(level?: string): void;
export {};
