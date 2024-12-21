import { BulmaClassComponent, isKey, isVal, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type { ColumnGap, ColumnSize } from '$lib/utils/bulma.types.js';
import { classnames } from '$lib/utils/classnames.js';

export type ColumnsOptions = BulmaClassOptions & {
	gapless: boolean;
	multiline: boolean;
	centered: boolean;
	vCentered: boolean;
	gap?: ColumnGap;
	gapMobile?: ColumnGap;
	gapTablet?: ColumnGap;
	gapTouch?: ColumnGap;
	gapDesktop?: ColumnGap;
	gapWidescreen?: ColumnGap;
	gapFullHD?: ColumnGap;
};
export type ColumnOptions = BulmaClassOptions & {
	size?: ColumnSize;
	sizeMobile?: ColumnSize;
	sizeTablet?: ColumnSize;
	sizeTouch?: ColumnSize;
	sizeDesktop?: ColumnSize;
	sizeWidescreen?: ColumnSize;
	sizeFulHD?: ColumnSize;
	offset?: ColumnSize;
	offsetMobile?: ColumnSize;
	offsetTablet?: ColumnSize;
	offsetTouch?: ColumnSize;
	offsetDesktop?: ColumnSize;
	offsetWidescreen?: ColumnSize;
	offsetFullHD?: ColumnSize;
	narrow?: boolean;
	narrowMobile?: boolean;
	narrowTablet?: boolean;
	narrowTouch?: boolean;
	narrowDesktop?: boolean;
	narrowWidescreen?: boolean;
	narrowFullHD?: boolean;
};

export class ColumnsClass extends BulmaClassComponent<ColumnsOptions> {
	constructor() {
		super('columns', {
			gapless: isKey,
			multiline: isKey,
			centered: isKey,
			vCentered: 'is-vcentered',
			gap: isKey,
			gapMobile: isKey,
			gapTablet: isKey,
			gapTouch: isKey,
			gapDesktop: isKey,
			gapWidescreen: isKey,
			gapFullHD: 'is-fullhd',
		});
	}
}

export class ColumnClass extends BulmaClassComponent<ColumnOptions> {
	constructor() {
		super('column', {
			size: isVal,
			sizeMobile: 'is-#-mobile',
			sizeTablet: 'is-#-tablet',
			sizeTouch: 'is-#-touch',
			sizeDesktop: 'is-#-desktop',
			sizeWidescreen: 'is-#-widescreen',
			sizeFulHD: 'is-#-fullhd',
			offset: 'is-offset-#',
			offsetMobile: 'is-offset-#-mobile',
			offsetTablet: 'is-offset-#-tablet',
			offsetTouch: 'is-offset-#-touch',
			offsetDesktop: 'is-offset-#-desktop',
			offsetWidescreen: 'is-offset-#-widescreen',
			offsetFullHD: 'is-offset-#-fullhd',
			narrow: isKey,
			narrowMobile: isKey,
			narrowTablet: isKey,
			narrowTouch: isKey,
			narrowDesktop: isKey,
			narrowWidescreen: isKey,
			narrowFullHD: 'is-narrow-fullhd',
		});
	}
}

export const columnsClass = new ColumnsClass();
export const columnClass = new ColumnClass();
