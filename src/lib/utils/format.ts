export class Formatter {
	constructor(readonly locale: string = 'es') {
		this.dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });
		this.timeFormat = new Intl.DateTimeFormat(locale, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
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

	clamp(value: number, min: number, max: number): number {
		return Math.max(min, Math.min(max, value));
	}

	dateString(date: Date | undefined, offset: number = 0): string | undefined {
		if (!date) return undefined;
		date = new Date(date);
		if (offset) date = new Date(date.getTime() + offset * date.getTimezoneOffset() * 60000);
		return this.dateFormat.format(date);
	}
	timeString(date: Date | undefined, offset: number = 0): string | undefined {
		if (!date) return undefined;
		date = new Date(date);
		if (offset) date = new Date(date.getTime() + offset * date.getTimezoneOffset() * 60000);
		return this.timeFormat.format(date);
	}
	dateTimeString(date: Date | undefined, offset: number = 0): string | undefined {
		if (!date) return undefined;
		return [this.dateString(date), this.timeString(date)].join(' ');
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

let formatter: Formatter;

export function getFormatter(): Formatter {
	if (!formatter) formatter = new Formatter();
	return formatter;
}

export function initFormatter(locale: string): Formatter {
	formatter = new Formatter(locale);
	return formatter;
}
