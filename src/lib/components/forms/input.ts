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

export const inputClass = new InputClass();
export const selectClass = new SelectClass();
export const selectWrapperClass = new SelectWrapperClass();
export const textareaClass = new TextareaClass();
export const checkboxClass = new CheckboxClass();
export const checkboxesClass = new CheckboxesClass();
export const fileClass = new FileClass();
export const fileLabelClass = new FileLabelClass();
export const fileInputClass = new FileInputClass();
export const fileCtaClass = new FileCtaClass();
export const fileNameClass = new FileNameClass();
export const radioClass = new RadioClass();
export const toggleClass = new ToggleClass();
export const toggleSliderClass = new ToggleSliderClass();
export const toggleContentClass = new ToggleContentClass();
