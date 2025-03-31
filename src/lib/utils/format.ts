import { injectable } from './injectable.js';

export class Formatter {
	static readonly DI = Symbol.for('Formatter');
	static getInstance(): Formatter {
		return injectable.get(Formatter.DI);
	}
	private _offsetMs: number = 0;
	constructor(readonly locale: string = 'es') {
		injectable.add(Formatter.DI, this);
		this.dateFormat = new Intl.DateTimeFormat(locale, {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		});
		this.timeFormat = new Intl.DateTimeFormat(locale, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			hourCycle: 'h23',
		});
		this.floatFormat = new Intl.NumberFormat(locale, {
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
			compactDisplay: 'short',
			useGrouping: true,
		});
		this.intFormat = new Intl.NumberFormat(locale, {
			maximumFractionDigits: 0,
			minimumFractionDigits: 0,
			compactDisplay: 'short',
			useGrouping: true,
		});
		this.floatFormat1 = new Intl.NumberFormat(locale, {
			maximumFractionDigits: 1,
			minimumFractionDigits: 1,
			compactDisplay: 'short',
			useGrouping: true,
		});
	}
	private readonly dateFormat: Intl.DateTimeFormat;
	private readonly timeFormat: Intl.DateTimeFormat;
	private readonly floatFormat: Intl.NumberFormat;
	private readonly intFormat: Intl.NumberFormat;
	private readonly floatFormat1: Intl.NumberFormat;

	get offsetMs() {
		return this._offsetMs;
	}
	get offsetMin() {
		return this._offsetMs / 60000;
	}

	set offsetMin(value: number) {
		this._offsetMs = value * 60000;
	}

	clamp(value: number, min: number, max: number): number {
		return Math.max(min, Math.min(max, value));
	}
	getDate(src: Date, offset: number = 1): Date | undefined {
		const date = new Date(src);
		return new Date(date.getTime() + this._offsetMs * offset);
	}
	dateString(date: Date | undefined, offset: number = 1): string | undefined {
		if (!date) return undefined;
		date = this.getDate(date, offset);
		return this.dateFormat.format(date);
	}
	timeString(date: Date | undefined, offset: number = 1): string | undefined {
		if (!date) return undefined;
		date = this.getDate(date, offset);
		return this.timeFormat.format(date);
	}
	dateTimeString(date: Date | undefined, offset: number = 1): string | undefined {
		if (!date) return undefined;
		return [this.dateString(date, offset), this.timeString(date, offset)].join(' ');
	}
	floatString(value: number | undefined): string | undefined {
		if (value == undefined) return undefined;
		return this.floatFormat.format(value);
	}
	floatString1(value: number | undefined): string | undefined {
		if (value == undefined) return undefined;
		return this.floatFormat1.format(value);
	}
	intString(value: number | undefined): string | undefined {
		if (value == undefined) return undefined;
		return this.intFormat.format(value);
	}
	boolString(
		value: boolean | undefined,
		{ ok, no }: { ok: string; no: string } = { ok: 'Si', no: 'No' },
	): string | undefined {
		if (value == undefined) return undefined;
		return value ? ok || 'Si' : no || 'No';
	}
	toDate(src: string, defValue: Date | undefined = undefined): Date | undefined {
		try {
			const date = new Date(src);
			const res = new Date(date.getTime() + 60000 * date.getTimezoneOffset());
			return res;
		} catch (err: any) {
			return defValue;
		}
	}
	fromDate(src: Date | undefined, defValue: string | undefined = undefined): string | undefined {
		try {
			const now = new Date();
			const res = (src || now).toISOString().split('T')[0];
			return res;
		} catch (err: any) {
			return defValue;
		}
	}
}
