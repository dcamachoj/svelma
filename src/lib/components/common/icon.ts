import { BulmaClassComponent, isVal, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type {
	BwColors,
	Colors,
	ContentSize,
	DarkColors,
	GreyColors,
	LightColors,
} from '$lib/utils/bulma.types.js';

export type IconType = 'icon' | 'panel-icon' | 'file-icon';

export type IconOptions = BulmaClassOptions & {
	type?: IconType;
	color?: Colors | BwColors | GreyColors | LightColors | DarkColors;
	size?: ContentSize;
	align?: 'left' | 'right';
};

export class IconClass extends BulmaClassComponent<IconOptions> {
	constructor() {
		super([], {
			type: '#',
			color: 'has-text-#',
			size: isVal,
			align: isVal,
		});
	}
}

export const icon = new IconClass();
