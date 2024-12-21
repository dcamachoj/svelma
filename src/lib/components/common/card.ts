import { BulmaClassComponent, isKey, type BulmaClassOptions } from '$lib/utils/bulma.js';

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

export const cardClass = new CardClass();
export const cardHeaderClass = new CardHeaderClass();
export const cardHeaderTitleClass = new CardHeaderTitleClass();
export const cardHeaderIconClass = new CardHeaderIconClass();
export const cardContentClass = new CardContentClass();
export const cardFooterClass = new CardFooterClass();
export const cardFooterItemClass = new CardFooterClass();
export const cardImageClass = new CardImageClass();
