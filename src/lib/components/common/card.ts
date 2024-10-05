import { BulmaClassComponent, bulmaClassnames, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type { BulmaOptions } from '$lib/utils/bulma.types.js';

export type CardHeaderTitleOptions = BulmaClassOptions & {
	centered?: boolean;
};

export class CardClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('card', {});
	}
}

export class CardHeaderClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('card-header', {});
	}
}

export class CardHeaderTitleClass extends BulmaClassComponent<CardHeaderTitleOptions> {
	constructor() {
		super('card-header-title', {
			centered: isKey,
		});
	}
}

export class CardHeaderIconClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('card-header-icon', {});
	}
}

export class CardContentClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('card-content', {});
	}
}

export class CardFooterClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('card-footer', {});
	}
}

export class CardFooterItemClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('card-footer-item', {});
	}
}

export class CardImageClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('card-image', {});
	}
}

export const card = new CardClass();
export const cardHeader = new CardHeaderClass();
export const cardHeaderTitle = new CardHeaderTitleClass();
export const cardHeaderIcon = new CardHeaderIconClass();
export const cardContent = new CardContentClass();
export const cardFooter = new CardFooterClass();
export const cardFooterItem = new CardFooterClass();
export const cardImage = new CardImageClass();
