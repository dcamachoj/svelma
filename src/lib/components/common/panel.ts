import { BulmaClassComponent, isVal, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type { Colors } from '$lib/utils/bulma.types.js';

export type PanelOptions = BulmaClassOptions & {
	color?: Colors;
};

export class PanelClass extends BulmaClassComponent<PanelOptions> {
	constructor() {
		super('panel', {
			color: isVal,
		});
	}
}

export class PanelHeadingClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('panel-heading', {});
	}
}

export class PanelBlockClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('panel-block', {});
	}
}

export class PanelIconClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('panel-icon', {});
	}
}

export class PanelTabsClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('panel-tabs', {});
	}
}

export const panelClass = new PanelClass();
export const panelHeadingClass = new PanelHeadingClass();
export const panelBlockClass = new PanelBlockClass();
export const panelIconClass = new PanelIconClass();
export const panelTabsClass = new PanelTabsClass();
