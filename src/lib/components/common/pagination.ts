import { BulmaClassComponent, isKey, isVal, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type { ContentSize, PaginationAlign } from '$lib/utils/bulma.types.js';

export type PaginationOptions = BulmaClassOptions & {
	align?: PaginationAlign;
	rounded?: boolean;
	size?: ContentSize;
};

export class PaginationClass extends BulmaClassComponent<PaginationOptions> {
	constructor() {
		super('pagination', {
			align: isVal,
			rounded: isKey,
			size: isVal,
		});
	}
	protected overrideValue(src: PaginationOptions): PaginationOptions {
		return {
			...src,
			align: src.align == 'left' ? undefined : src.align,
		};
	}
}

export class PaginationPrevClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('pagination-previous', {});
	}
}

export class PaginationNextClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('pagination-next', {});
	}
}

export class PaginationListClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('pagination-list', {});
	}
}

export class PaginationEllipsisClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('pagination-ellipsis', {});
	}
}

export type PaginationLinkOptions = BulmaClassOptions & {
	current?: boolean;
};

export class PaginationLinkClass extends BulmaClassComponent<PaginationLinkOptions> {
	constructor() {
		super('pagination-link', {
			current: isKey,
		});
	}
}

export const paginationClass = new PaginationClass();
export const paginationPrevClass = new PaginationPrevClass();
export const paginationNextClass = new PaginationNextClass();
export const paginationListClass = new PaginationListClass();
export const paginationEllipsisClass = new PaginationEllipsisClass();
export const paginationLinkClass = new PaginationLinkClass();
