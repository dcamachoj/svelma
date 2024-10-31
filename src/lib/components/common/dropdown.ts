import { BulmaClassComponent, isKey, type BulmaClassOptions } from '$lib/utils/bulma.js';

export type DropdownOptions = BulmaClassOptions & {
	active?: boolean;
	hoverable?: boolean;
	right?: boolean;
	up?: boolean;
};

export class DropdownClass extends BulmaClassComponent<DropdownOptions> {
	constructor() {
		super('dropdown', {
			active: isKey,
			hoverable: isKey,
			right: isKey,
			up: isKey,
		});
	}
}

export class DropdownTriggerClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('dropdown-trigger', {});
	}
}

export const dropdown = new DropdownClass();
export const dropdownTrigger = new DropdownTriggerClass();
