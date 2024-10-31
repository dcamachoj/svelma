export function catchError<T, E extends new (message?: string) => Error>(
	promise: Promise<T>,
	errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
	return promise
		.then((data) => {
			return [undefined, data] as [undefined, T];
		})
		.catch((err) => {
			if (!errorsToCatch) {
				return [err];
			}
			if (errorsToCatch.some((e) => err instanceof e)) {
				return [err];
			}
			throw err;
		});
}
