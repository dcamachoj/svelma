import { BulmaClassComponent, isKey, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type { BwColors, Colors, TextAlign } from '$lib/utils/bulma.types.js';

export type TableOptions = BulmaClassOptions & {
	bordered?: boolean;
	striped?: boolean;
	narrow?: boolean;
	hoverable?: boolean;
	fullwidth?: boolean;
};

export class TableClass extends BulmaClassComponent<TableOptions> {
	constructor() {
		super('table', {
			bordered: isKey,
			striped: isKey,
			narrow: isKey,
			hoverable: isKey,
			fullwidth: isKey,
		});
	}
}

export class TableContainerClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('table-container', {});
	}
}

export type TableRowOptions = BulmaClassOptions & {
	color?: Colors | BwColors;
	selected?: boolean;
};

export class TableRowClass extends BulmaClassComponent<TableRowOptions> {
	constructor() {
		super([], { color: isKey, selected: isKey });
	}
}

export type TableCellOptions = BulmaClassOptions & {
	color?: Colors | BwColors;
	align?: TextAlign;
};

export class TableCellClass extends BulmaClassComponent<TableCellOptions> {
	constructor() {
		super([], { color: isKey, align: 'has-text-$' });
	}
}

export class TableHeadClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super([], {});
	}
}

export class TableBodyClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super([], {});
	}
}

export class TableFootClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super([], {});
	}
}

export const table = new TableClass();
export const tableContainer = new TableContainerClass();
export const tableRow = new TableRowClass();
export const tableCell = new TableCellClass();
export const tableHead = new TableHeadClass();
export const tableBody = new TableBodyClass();
export const tableFoot = new TableFootClass();
