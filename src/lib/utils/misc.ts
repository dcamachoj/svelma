export type SelectedItem<T> = {
	item: T;
	selected: boolean;
};

export function to_snake_case(str: string) {
	return str.replace(/(([a-z])(?=[A-Z][a-zA-Z])|([A-Z])(?=[A-Z][a-z]))/g, '$1_').toLowerCase();
}

export async function randomDelay(min: number, max: number) {
	const delay = Math.random() * (max - min) + min;
	return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function delayMs(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
