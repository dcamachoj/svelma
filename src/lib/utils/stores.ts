import type { Readable } from 'svelte/motion';
import { writable } from 'svelte/store';
import type { ButtonColor, ButtonSize } from './bulma.types.js';
import { injectable } from './injectable.js';
import { EnvPublic } from './env.js';

export type MessageType = 'error' | 'warn' | 'info' | 'debug';
export type Message = {
	type: MessageType;
	message: string;
};
export type MenuAction = {
	icon?: string;
	text?: string;
	href?: string;
	title?: string;
	color?: ButtonColor;
	size?: ButtonSize;
	preloadData?: 'tap' | 'hover';
	isNotCentered?: boolean;
	disabled?: Readable<boolean>;
	click?: () => void;
};

export const appMessage = writable<Message | null>(null);
export const appTitle = writable<string>('');
export const appMenuStart = writable<MenuAction[]>([]);
export const appMenuEnd = writable<MenuAction[]>([]);

export function setAppMessage(message: string, type: MessageType = 'info'): Message {
	const msg: Message = { type, message };
	appMessage.set(msg);
	if (type != 'error') {
		const env = injectable.get<EnvPublic>(EnvPublic.DI);
		setTimeout(clrAppMessage, env.messageTimeout);
	}
	return msg;
}
export function clrAppMessage() {
	appMessage.set(null);
}
