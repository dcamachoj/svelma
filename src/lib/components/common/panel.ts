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

export const panel = new PanelClass();
export const panelHeading = new PanelHeadingClass();
export const panelBlock = new PanelBlockClass();
export const panelIcon = new PanelIconClass();
export const panelTabs = new PanelTabsClass();
