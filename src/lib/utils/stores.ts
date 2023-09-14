import { writable } from 'svelte/store';

export const DocumentTitle = writable<string>('');
export const DocumentDescription = writable<string>('');
