import { injectable } from './injectable.js';

const LogLevels = ['error', 'warn', 'info', 'debug'];
const LogLevelError = 0;
const LogLevelWarn = 1;
const LogLevelInfo = 2;
const LogLevelDebug = 3;

export type ILogger = {
	error(message?: any, ...optionalParams: any[]): void;
	warn(message?: any, ...optionalParams: any[]): void;
	info(message?: any, ...optionalParams: any[]): void;
	debug(message?: any, ...optionalParams: any[]): void;
};

export class Logger implements ILogger {
	static readonly DI = Symbol.for('Logger');
	static getInstance(): Logger {
		return injectable.get(Logger.DI);
	}
	protected readonly _level: number;
	constructor(logLevel: string = 'info') {
		let level = LogLevels.indexOf(logLevel.trim().toLowerCase() || 'info');
		if (level == -1) level = LogLevelInfo;
		this._level = level;
		injectable.set(Logger.DI, this);
		console.log(`LoggerLevel: ${LogLevels[level]} (${level})`);
	}

	protected _canLog(level: number) {
		return level <= this._level;
	}
	protected _message(level: number, message?: any, ...optionalParams: any[]): [string, any[]] {
		const now = new Date().toISOString();
		return [`${now} [${LogLevels[level].toUpperCase()}]`, [message, ...optionalParams]];
	}

	error(message?: any, ...optionalParams: any[]) {
		if (!this._canLog(LogLevelError)) return;
		const [msg, params] = this._message(LogLevelError, message, ...optionalParams);
		console.error(msg, ...params);
	}
	warn(message?: any, ...optionalParams: any[]) {
		if (!this._canLog(LogLevelWarn)) return;
		const [msg, params] = this._message(LogLevelWarn, message, ...optionalParams);
		console.warn(msg, ...params);
	}
	info(message?: any, ...optionalParams: any[]) {
		if (!this._canLog(LogLevelInfo)) return;
		const [msg, params] = this._message(LogLevelInfo, message, ...optionalParams);
		console.info(msg, ...params);
	}
	debug(message?: any, ...optionalParams: any[]) {
		if (!this._canLog(LogLevelDebug)) return;
		const [msg, params] = this._message(LogLevelDebug, message, ...optionalParams);
		console.log(msg, ...params);
	}
}
