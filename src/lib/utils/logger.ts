import { injectable } from './injectable.js';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';
const LogLevels = ['error', 'warn', 'info', 'debug'];
const LogLevelError = 0;
const LogLevelWarn = 1;
const LogLevelInfo = 2;
const LogLevelDebug = 3;

export class Logger {
	static readonly DI = Symbol.for('Logger');
	static getInstance(): Logger {
		return injectable.get(Logger.DI);
	}
	protected readonly _level: number;
	constructor(logLevel: LogLevel = 'info') {
		let level = LogLevels.indexOf(logLevel.trim().toLowerCase() || 'info');
		if (level == -1) level = LogLevelInfo;
		this._level = level;
	}

	protected _canLog(level: number) {
		return level <= this._level;
	}

	error(message?: any, ...optionalParams: any[]) {
		if (!this._canLog(LogLevelError)) return;
		console.error(message, ...optionalParams);
	}
	warn(message?: any, ...optionalParams: any[]) {
		if (!this._canLog(LogLevelWarn)) return;
		console.warn(message, ...optionalParams);
	}
	info(message?: any, ...optionalParams: any[]) {
		if (!this._canLog(LogLevelInfo)) return;
		console.info(message, ...optionalParams);
	}
	debug(message?: any, ...optionalParams: any[]) {
		if (!this._canLog(LogLevelDebug)) return;
		console.log(message, ...optionalParams);
	}
}
