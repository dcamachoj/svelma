import {
	BulmaClassComponent,
	hasKey,
	isKey,
	isVal,
	type BulmaClassOptions,
} from '$lib/utils/bulma.js';
import type { BwColors, Colors } from '$lib/utils/bulma.types.js';

export type NavbarOptions = BulmaClassOptions & {
	color?: Colors | BwColors;
	fixed?: 'top' | 'bottom';
	transparent?: boolean;
	spaced?: boolean;
	shadow?: boolean;
	test?: boolean;
};

export class NavbarClass extends BulmaClassComponent<NavbarOptions> {
	constructor() {
		super('navbar', {
			color: isVal,
			fixed: isVal,
			transparent: isKey,
			spaced: isKey,
			shadow: hasKey,
			test: isKey,
		});
	}
}

export class NavbarBrandClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('navbar-brand', {});
	}
}

export type NavbarItemOptions = BulmaClassOptions & {
	expanded?: boolean;
	tab?: boolean;
	active?: boolean;
	dropdown?: boolean;
	hoverable?: boolean;
	selected?: boolean;
};

export class NavbarItemClass extends BulmaClassComponent<NavbarItemOptions> {
	constructor() {
		super('navbar-item', {
			expanded: isKey,
			tab: isKey,
			active: isKey,
			dropdown: hasKey,
			hoverable: isKey,
			selected: isKey,
		});
	}
}

export class NavbarDividerClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('navbar-divider', {});
	}
}

export type NavbarLinkOptions = BulmaClassOptions & {
	arrowless?: boolean;
};

export class NavbarLinkClass extends BulmaClassComponent<NavbarLinkOptions> {
	constructor() {
		super('navbar-link', { arrowless: isKey });
	}
}

export type NavbarDropdownOptions = BulmaClassOptions & {
	right?: boolean;
	dropdownUp?: boolean;
	boxed?: boolean;
};

export class NavbarDropdownClass extends BulmaClassComponent<NavbarDropdownOptions> {
	constructor() {
		super('navbar-dropdown', {
			right: isKey,
			dropdownUp: hasKey,
			boxed: isKey,
		});
	}
}

export class NavbarStartClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('navbar-start', {});
	}
}

export class NavbarEndClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('navbar-end', {});
	}
}

export type NavbarMenuOptions = BulmaClassOptions & {
	active?: boolean;
};

export class NavbarMenuClass extends BulmaClassComponent<NavbarMenuOptions> {
	constructor() {
		super('navbar-menu', { active: isKey });
	}
}

export const navbarClass = new NavbarClass();
export const navbarBrandClass = new NavbarBrandClass();
export const navbarItemClass = new NavbarItemClass();
export const navbarDividerClass = new NavbarDividerClass();
export const navbarLinkClass = new NavbarLinkClass();
export const navbarDropdownClass = new NavbarDropdownClass();
export const navbarStartClass = new NavbarStartClass();
export const navbarEndClass = new NavbarEndClass();
export const navbarMenuClass = new NavbarMenuClass();
