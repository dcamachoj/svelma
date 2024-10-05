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

export const modal = new ModalClass();
export const modalBackground = new ModalBackgroundClass();
export const modalClose = new ModalCloseClass();
export const modalContent = new ModalContentClass();
export const modalCard = new ModalCardClass();
export const modalCardHead = new ModalCardHeadClass();
export const modalCardTitle = new ModalCardTitleClass();
export const modalCardBody = new ModalCardBodyClass();
export const modalCardFoot = new ModalCardFootClass();
