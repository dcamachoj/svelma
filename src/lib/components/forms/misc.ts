import { BulmaClassComponent, isKey, isVal, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type { Colors, ContentSize, FieldAlign, LabelSize } from '$lib/utils/bulma.types.js';

export type FieldOptions = BulmaClassOptions & {
	addons?: boolean;
	addonsCentered?: boolean;
	addonsRight?: boolean;
	grouped?: FieldAlign;
	groupedMultiline?: boolean;
	horizontal?: boolean;
};

export class FieldClass extends BulmaClassComponent<FieldOptions> {
	constructor() {
		super('field', {
			addons: 'has-$',
			addonsCentered: 'has-$',
			addonsRight: 'has-$',
			grouped: [isKey, 'is-$-#'],
			groupedMultiline: isKey,
			horizontal: isKey,
		});
	}

	protected overrideValue(src: FieldOptions): FieldOptions {
		return {
			...src,
			grouped: src.grouped == 'left' ? undefined : src.grouped,
			groupedMultiline:
				src.grouped == 'left' || src.grouped == undefined ? undefined : src.groupedMultiline,
		};
	}
}

export type FieldLabelOptions = BulmaClassOptions & {
	size?: LabelSize;
};

export class FieldLabelClass extends BulmaClassComponent<FieldLabelOptions> {
	constructor() {
		super('field-label', {
			size: isKey,
		});
	}
}

export class FieldBodyClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('field-body', {});
	}
}

export type ControlOptions = BulmaClassOptions & {
	iconsLeft?: boolean;
	iconsRight?: boolean;
	expanded?: boolean;
	loading?: boolean;
};

export class ControlClass extends BulmaClassComponent<ControlOptions> {
	constructor() {
		super('control', {
			iconsLeft: 'has-$',
			iconsRight: 'has-$',
			expanded: isKey,
			loading: isKey,
		});
	}
}

export class LabelClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('label', {});
	}
}

export type HelpOptions = BulmaClassOptions & {
	color?: Colors;
};

export class HelpClass extends BulmaClassComponent<HelpOptions> {
	constructor() {
		super('help', { color: isVal });
	}
}

export const field = new FieldClass();
export const fieldLabel = new FieldLabelClass();
export const fieldBody = new FieldBodyClass();
export const control = new ControlClass();
export const label = new LabelClass();
export const help = new HelpClass();
