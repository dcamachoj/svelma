import { BulmaClassComponent, isKey, isVal, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type { BwColors, Colors, FieldAlign, InputSize } from '$lib/utils/bulma.types.js';

export type InputOptions = BulmaClassOptions & {
	color?: Colors;
	size?: InputSize;
	rounded?: boolean;
	hovered?: boolean;
	focused?: boolean;
	isStatic?: boolean;
	fullwidth?: boolean;
};

export class InputClass extends BulmaClassComponent<InputOptions> {
	constructor() {
		super('input', {
			color: isVal,
			size: isVal,
			rounded: isKey,
			hovered: isKey,
			focused: isKey,
			isStatic: 'is-static',
			fullwidth: isKey,
		});
	}
}

export type SelectOptions = BulmaClassOptions & {
	hovered?: boolean;
	focused?: boolean;
};

export class SelectClass extends BulmaClassComponent<SelectOptions> {
	constructor() {
		super([], {
			hovered: isKey,
			focused: isKey,
		});
	}
}

export type SelectWrapperOptions = BulmaClassOptions & {
	color?: Colors;
	size?: InputSize;
	rounded?: boolean;
	hovered?: boolean;
	focused?: boolean;
	isStatic?: boolean;
	fullwidth?: boolean;
};

export class SelectWrapperClass extends BulmaClassComponent<SelectWrapperOptions> {
	constructor() {
		super('select', {
			color: isVal,
			size: isVal,
			rounded: isKey,
			hovered: isKey,
			focused: isKey,
			isStatic: 'is-static',
			fullwidth: isKey,
		});
	}
}

export type TextareaOptions = BulmaClassOptions & {
	color?: Colors;
	size?: InputSize;
	rounded?: boolean;
	hovered?: boolean;
	focused?: boolean;
	isStatic?: boolean;
	fixedSize?: boolean;
};

export class TextareaClass extends BulmaClassComponent<TextareaOptions> {
	constructor() {
		super('textarea', {
			color: isVal,
			size: isVal,
			rounded: isKey,
			hovered: isKey,
			focused: isKey,
			isStatic: 'is-static',
			fixedSize: isKey,
		});
	}
}

export class CheckboxClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('checkbox', {});
	}
}

export class CheckboxesClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('checkboxes', {});
	}
}

export type FileOptions = BulmaClassOptions & {
	color?: Colors | BwColors;
	size?: InputSize;
	align?: FieldAlign;
	hasName?: boolean;
	right?: boolean;
	fullwidth?: boolean;
	boxed?: boolean;
};

export class FileClass extends BulmaClassComponent<FileOptions> {
	constructor() {
		super('file', {
			color: isVal,
			align: isVal,
			size: isVal,
			hasName: 'has-name',
			right: isKey,
			fullwidth: isKey,
			boxed: isKey,
		});
	}
}

export class FileLabelClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('file-label', {});
	}
}

export class FileInputClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('file-input', {});
	}
}

export class FileCtaClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('file-cta', {});
	}
}

export class FileNameClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('file-name', {});
	}
}

export class RadioClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('radio', {});
	}
}

export class ToggleClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('toggle', {});
	}
}

export type ToggleSliderOptions = BulmaClassOptions & {
	rounded?: boolean;
};

export class ToggleSliderClass extends BulmaClassComponent<ToggleSliderOptions> {
	constructor() {
		super('toggle-slider', {
			rounded: isKey,
		});
	}
}

export class ToggleContentClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('toggle-content', {});
	}
}

export const input = new InputClass();
export const select = new SelectClass();
export const selectWrapper = new SelectWrapperClass();
export const textarea = new TextareaClass();
export const checkbox = new CheckboxClass();
export const checkboxes = new CheckboxesClass();
export const file = new FileClass();
export const fileLabel = new FileLabelClass();
export const fileInput = new FileInputClass();
export const fileCta = new FileCtaClass();
export const fileName = new FileNameClass();
export const radio = new RadioClass();
export const toggle = new ToggleClass();
export const toggleSlider = new ToggleSliderClass();
export const toggleContent = new ToggleContentClass();
