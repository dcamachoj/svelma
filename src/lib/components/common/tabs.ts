import { BulmaClassComponent, type BulmaClassOptions, isKey, isVal } from '$lib/utils/bulma.js';
import type { TabsAlign, TabsSize } from '$lib/utils/bulma.types.js';

export type TabsOptions = BulmaClassOptions & {
	align?: TabsAlign;
	size?: TabsSize;
	boxed?: boolean;
	toggled?: boolean;
	toggledRounded?: boolean;
	fullwidth?: boolean;
};

export class TabsClass extends BulmaClassComponent<TabsOptions> {
	constructor() {
		super('tabs', {
			align: isVal,
			size: isVal,
			boxed: isKey,
			toggled: isKey,
			toggledRounded: isKey,
			fullwidth: isKey,
		});
	}
}

export type TabOptions = BulmaClassOptions & {
	active?: boolean;
};

export class TabClass extends BulmaClassComponent<TabOptions> {
	constructor() {
		super('', { active: isKey });
	}
}

export const tabs = new TabsClass();
export const tab = new TabClass();
