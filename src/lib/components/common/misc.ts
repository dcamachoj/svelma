import { BulmaClassComponent, isKey, isVal, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type {
	BreadcrumbSeparator,
	BwColors,
	Colors,
	ContentSize,
	OlType,
	TagSize,
	TitleSize,
} from '$lib/utils/bulma.types.js';

export class BlockClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('block', {});
	}
}

export class BoxClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('box', {});
	}
}

export type BreadcrumbOptions = BulmaClassOptions & {
	centered?: boolean;
	right?: boolean;
	separator?: BreadcrumbSeparator;
	size?: ContentSize;
};

export class BreadcrumbClass extends BulmaClassComponent<BreadcrumbOptions> {
	constructor() {
		super('breadcrumb', {
			centered: isKey,
			right: isKey,
			separator: 'is-#-separator',
			size: isVal,
		});
	}
}

export type ContentSizeOptions = BulmaClassOptions & {
	size?: ContentSize;
};

export class ContentClass extends BulmaClassComponent<ContentSizeOptions> {
	constructor() {
		super('content', {
			size: isVal,
		});
	}
}

export class DeleteClass extends BulmaClassComponent<ContentSizeOptions> {
	constructor() {
		super('delete', {
			size: isVal,
		});
	}
}

export type MessageOptions = BulmaClassOptions & {
	color?: Colors | 'dark';
	size?: ContentSize;
};

export class MessageClass extends BulmaClassComponent<MessageOptions> {
	constructor() {
		super('message', {
			color: isVal,
			size: isVal,
		});
	}
}

export class MessageHeaderClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('message-header', {});
	}
}

export class MessageBodyClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('message-body', {});
	}
}

export type NotificationOptions = BulmaClassOptions & {
	color?: Colors;
	light?: boolean;
};

export class NotificationClass extends BulmaClassComponent<NotificationOptions> {
	constructor() {
		super('notification', {
			color: isVal,
			light: isKey,
		});
	}
}

export type OrderedListOptions = BulmaClassOptions & {
	type?: OlType;
};

export class OrderedListClass extends BulmaClassComponent<OrderedListOptions> {
	constructor() {
		super('box', {
			type: isVal,
		});
	}
}

export type ProgressOptions = BulmaClassOptions & {
	size?: ContentSize | 'normal';
	color?: Colors;
};

export class ProgressClass extends BulmaClassComponent<ProgressOptions> {
	constructor() {
		super('progress', {
			size: isVal,
			color: isVal,
		});
	}
}

export type TagOptions = BulmaClassOptions & {
	color?: Colors | BwColors;
	size?: TagSize;
	rounded?: boolean;
	hoverable?: boolean;
	del?: boolean;
};

export class TagClass extends BulmaClassComponent<TagOptions> {
	constructor() {
		super('tag', {
			color: isVal,
			size: isVal,
			rounded: isKey,
			hoverable: isKey,
			del: 'is-delete',
		});
	}
}

export class TagsClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('tags', {});
	}
}

export type TitleOptions = BulmaClassOptions & {
	size?: TitleSize;
};

export class TitleClass extends BulmaClassComponent<TitleOptions> {
	constructor() {
		super('title', { size: isVal });
	}
}

export class SubtitleClass extends BulmaClassComponent<TitleOptions> {
	constructor() {
		super('subtitle', { size: isVal });
	}
}

export const blockClass = new BlockClass();
export const boxClass = new BoxClass();
export const breadcrumbClass = new BreadcrumbClass();
export const contentClass = new ContentClass();
export const delClass = new DeleteClass();
export const messageClass = new MessageClass();
export const messageHeaderClass = new MessageHeaderClass();
export const messageBodyClass = new MessageBodyClass();
export const notificationClass = new NotificationClass();
export const orderedListClass = new OrderedListClass();
export const progressClass = new ProgressClass();
export const tagClass = new TagClass();
export const tagsClass = new TagsClass();
export const titleClass = new TitleClass();
export const subtitleClass = new SubtitleClass();
