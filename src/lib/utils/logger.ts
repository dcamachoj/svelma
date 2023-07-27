const LogLevels = ['error', 'warn', 'info', 'debug'];
const LogLevelError = 0;
const LogLevelWarn = 1;
const LogLevelInfo = 2;
const LogLevelDebug = 3;
let LogLevel = 'info';

class Logger {
	_level: number;
	constructor() {
		this._level = LogLevels.indexOf(LogLevel || 'info');
		if (this._level == -1) this._level = LogLevelInfo;
	}

	_canLog(level: number) {
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

export const logger = new Logger();
export function initLogger(level?: string) {
	if (level && LogLevels.includes(level)) {
		LogLevel = level;
	}
}
