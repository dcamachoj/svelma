export function classnames(...args: app.ClsArgument[]): string {
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
				for (var key in obj) {
					if (hasOwn.call(obj, key) && obj[key]) {
						classes.push(key);
					}
				}
			} else {
				classes.push(arg.toString());
			}
		}
	});
	return classes.join(' ');
}
