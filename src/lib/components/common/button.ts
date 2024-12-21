import { BulmaClassComponent, isKey, isVal, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type { ButtonColor, ButtonSize } from '$lib/utils/bulma.types.js';

export type ButtonOptions = BulmaClassOptions & {
	color?: ButtonColor;
	light?: boolean;
	size?: ButtonSize;
	responsive?: boolean;
	fullwidth?: boolean;
	outlined?: boolean;
	inverted?: boolean;
	rounded?: boolean;
	loading?: boolean;
	isStatic?: boolean;
};

export class ButtonClass extends BulmaClassComponent<ButtonOptions> {
	constructor() {
		super('button', {
			color: isVal,
			light: isKey,
			size: isVal,
			responsive: isKey,
			fullwidth: isKey,
			outlined: isKey,
			inverted: isKey,
			rounded: isKey,
			loading: isKey,
			isStatic: 'is-static',
		});
	}
}

export const buttonClass = new ButtonClass();
