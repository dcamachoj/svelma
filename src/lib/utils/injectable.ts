export class Injectable {
	private dependencies: Record<symbol, any> = {};

	get<T>(key: symbol): T {
		const value = this.dependencies[key];
		if (!value) throw new Error(`Dependency not found for ${key.toString()}`);
		return value as T;
	}
	add(key: symbol, value: any) {
		if (this.dependencies[key]) throw new Error(`Dependency for ${key.toString()} already defined`);
		this.dependencies[key] = value;
	}
	set(key: symbol, value: any) {
		this.dependencies[key] = value;
	}
}

export const injectable = new Injectable();
