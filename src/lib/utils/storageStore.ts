import { writable, type Writable, type Updater } from 'svelte/store';

export type StoragePersister<T> = {
	loadFromStorage(storage: Storage, key: string, defValue: T): T;
	saveToStorage(storage: Storage, key: string, value: T): void;
};

export class StringStoragePersister implements StoragePersister<string> {
	loadFromStorage(storage: Storage, key: string, defValue: string): string {
		const value = storage.getItem(key);
		if (value == null) return defValue;
		return value;
	}
	saveToStorage(storage: Storage, key: string, value: string): void {
		storage.setItem(key, value);
	}
}

export class NumberStoragePersister implements StoragePersister<number> {
	loadFromStorage(storage: Storage, key: string, defValue: number): number {
		const value = storage.getItem(key);
		if (value == null) return defValue;
		return +value;
	}
	saveToStorage(storage: Storage, key: string, value: number): void {
		storage.setItem(key, value?.toString());
	}
}

export class JsonStoragePersister<T extends Object> implements StoragePersister<T> {
	constructor(readonly pretty: boolean = false) {}
	loadFromStorage(storage: Storage, key: string, defValue: T): T {
		const value = storage.getItem(key);
		if (value == null) return defValue;
		try {
			return JSON.parse(value || '{}');
		} catch (e) {
			console.error('Parsing', { value });
			return defValue;
		}
	}
	saveToStorage(storage: Storage, key: string, value: T): void {
		storage.setItem(key, this.pretty ? JSON.stringify(value, null, 2) : JSON.stringify(value));
	}
}

export class InMemoryStorage implements Storage {
	private data = new Map<string, string>();

	clear(): void {
		this.data.clear();
	}

	getItem(key: string): string | null {
		return this.data.get(String(key)) ?? null;
	}

	removeItem(key: string): void {
		this.data.delete(String(key));
	}

	key(index: number): string | null {
		return [...this.data.keys()][Number(index)] ?? null;
	}

	setItem(key: string, value: string): void {
		this.data.set(String(key), String(value));
	}

	get length(): number {
		return this.data.size;
	}
}

export function storageStore<T>(
	persister: StoragePersister<T>,
	storage: Storage,
	key: string,
	defValue: T
): Writable<T> {
	const initValue = persister.loadFromStorage(storage, key, defValue);
	const store = writable<T>(initValue);
	return {
		set(value: T) {
			persister.saveToStorage(storage, key, value);
			store.set(value);
		},
		update(updater: Updater<T>) {
			store.update((value) => {
				const newValue = updater(value);
				persister.saveToStorage(storage, key, newValue);
				return newValue;
			});
		},
		subscribe: store.subscribe
	};
}
