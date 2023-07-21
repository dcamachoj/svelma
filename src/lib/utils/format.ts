const dateFormat = new Intl.DateTimeFormat('es', { dateStyle: 'medium' });
const timeFormat = new Intl.DateTimeFormat('es', { timeStyle: 'medium' });
const floatFormat = new Intl.NumberFormat('es', {
	maximumFractionDigits: 2,
	minimumFractionDigits: 2,
	compactDisplay: 'short',
	useGrouping: true
});
const intFormat = new Intl.NumberFormat('es', {
	maximumFractionDigits: 0,
	minimumFractionDigits: 0,
	compactDisplay: 'short',
	useGrouping: true
});
const floatFormat1 = new Intl.NumberFormat('es', {
	maximumFractionDigits: 1,
	minimumFractionDigits: 1,
	compactDisplay: 'short',
	useGrouping: true
});

class Formatter {
	clamp(value: number, min: number, max: number): number {
		return Math.max(min, Math.min(max, value));
	}

	dateString(date: Date | undefined, offset: number = 0): string | undefined {
		if (!date) return undefined;
		date = new Date(date);
		if (offset) date = new Date(date.getTime() + offset * date.getTimezoneOffset() * 60000);
		return dateFormat.format(date);
	}
	timeString(date: Date | undefined, offset: number = 0): string | undefined {
		if (!date) return undefined;
		date = new Date(date);
		if (offset) date = new Date(date.getTime() + offset * date.getTimezoneOffset() * 60000);
		return timeFormat.format(date);
	}
	floatString(value: number | undefined): string | undefined {
		if (value == undefined) return undefined;
		return floatFormat.format(value);
	}
	floatString1(value: number | undefined): string | undefined {
		if (value == undefined) return undefined;
		return floatFormat1.format(value);
	}
	intString(value: number | undefined): string | undefined {
		if (value == undefined) return undefined;
		return intFormat.format(value);
	}
	boolString(
		value: boolean | undefined,
		{ ok, no }: { ok: string; no: string } = { ok: 'Si', no: 'No' }
	): string | undefined {
		if (value == undefined) return undefined;
		return value ? ok || 'Si' : no || 'No';
	}
}

export const formatter = new Formatter();
