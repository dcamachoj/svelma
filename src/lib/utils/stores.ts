import type { Readable } from 'svelte/motion';
import { writable } from 'svelte/store';
import type { ButtonColor, ButtonSize } from './bulma.types.js';
import { injectable } from './injectable.js';
import { EnvPublic } from './env.js';
import type { I18nParams } from './i18n.js';

export type AppMessageType = 'error' | 'warn' | 'info' | 'debug';
export type AppMessage = {
	type: AppMessageType;
	message: string;
	params?: I18nParams;
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
	disabled?: boolean | Readable<boolean>;
	click?: () => void;
};

export const appMessage = writable<AppMessage | null>(null);
export const appTitle = writable<string>('');
export const appMenuStart = writable<MenuAction[]>([]);
export const appMenuEnd = writable<MenuAction[]>([]);
export const appDescription = writable<string>('');

export function setAppMessage(
	message: string,
	type: AppMessageType = 'info',
	params?: I18nParams,
): AppMessage {
	const msg: AppMessage = { type, message, params };
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
