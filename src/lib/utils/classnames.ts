export type ClsValue = string | number | undefined | null;
export type ClsMapping = { [key: string]: any };
export type ClsArgument = ClsValue | ClsMapping | ClsArgument[];

export type ClsKeyNameConverter = (name: string) => string;
export const defaultClsKeyNameConverter = clsKeyNameConverterDashCamelCase;
let clsKeyNameConverter: ClsKeyNameConverter = defaultClsKeyNameConverter;

export function getClsKeyNameConverter(): ClsKeyNameConverter {
	return clsKeyNameConverter;
}

export function setClsKeyNameConverter(fn: ClsKeyNameConverter = defaultClsKeyNameConverter) {
	clsKeyNameConverter = fn;
}

export function clsNameConvertChain(name: string, ...fns: ClsKeyNameConverter[]) {
	let result = name;
	fns.forEach((fn) => (result = fn(result)));
	return result;
}

export function clsNameConvertSimple(name: string): string {
	return name;
}

export function clsKeyNameConverterDashCase(name: string): string {
	return name.replaceAll('_', '-');
}

export function clsKeyNameConverterCamelCase(name: string): string {
	return name.replace(/[A-Z]/g, (s) => `-${s.toLowerCase()}`);
}

export function clsKeyNameConverterDashCamelCase(name: string): string {
	return clsNameConvertChain(name, clsKeyNameConverterDashCase, clsKeyNameConverterCamelCase);
}

export function classnames(...args: ClsArgument[]): string {
	const hasOwn = {}.hasOwnProperty;
	var classes: string[] = [];
	args.forEach((arg) => {
		if (!arg) return;
		const argType = typeof arg;
		if (argType == 'string' || argType == 'number') {
			classes.push(arg.toString());
		} else if (Array.isArray(arg)) {
			if (arg.length) {
				var inner = classnames.apply(null, arg);
				if (inner) classes.push(inner);
			}
		} else if (argType == 'object') {
			if (arg.toString === Object.prototype.toString) {
				const obj = arg as Record<string, any>;
				for (const key in obj) {
					if (hasOwn.call(obj, key) && obj[key]) {
						classes.push(clsKeyNameConverter(key));
					}
				}
			} else {
				classes.push(arg.toString());
			}
		}
	});
	return classes.join(' ').split(' ').filter(Boolean).join(' ');
}
