import { BulmaClassComponent, type BulmaClassOptions } from '$lib/utils/bulma.js';

export class MenuClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('menu', {});
	}
}

export class MenuLabelClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('menu-label', {});
	}
}

export const menu = new MenuClass();
export const menuLabel = new MenuLabelClass();
