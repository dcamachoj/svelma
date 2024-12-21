import { BulmaClassComponent, isKey, type BulmaClassOptions } from '$lib/utils/bulma.js';

export type ModalOptions = BulmaClassOptions & {
	active?: boolean;
};

export class ModalClass extends BulmaClassComponent<ModalOptions> {
	constructor() {
		super('modal', {
			active: isKey,
		});
	}
}

export class ModalBackgroundClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('modal-background', {});
	}
}

export class ModalCloseClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('modal-close is-large', {});
	}
}

export class ModalContentClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('modal-content', {});
	}
}

export class ModalCardClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('modal-card', {});
	}
}

export class ModalCardHeadClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('modal-card-head', {});
	}
}

export class ModalCardTitleClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('modal-card-title', {});
	}
}

export class ModalCardBodyClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('modal-card-body', {});
	}
}

export class ModalCardFootClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('modal-card-foot', {});
	}
}

export const modalClass = new ModalClass();
export const modalBackgroundClass = new ModalBackgroundClass();
export const modalCloseClass = new ModalCloseClass();
export const modalContentClass = new ModalContentClass();
export const modalCardClass = new ModalCardClass();
export const modalCardHeadClass = new ModalCardHeadClass();
export const modalCardTitleClass = new ModalCardTitleClass();
export const modalCardBodyClass = new ModalCardBodyClass();
export const modalCardFootClass = new ModalCardFootClass();
