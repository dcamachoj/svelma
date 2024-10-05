import { writable } from 'svelte/store';

export const documentTitle = writable<string>('');
export const documentDescription = writable<string>('');
