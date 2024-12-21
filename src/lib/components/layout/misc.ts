import { BulmaClassComponent, isKey, isVal, type BulmaClassOptions } from '$lib/utils/bulma.js';
import type { Colors, HeroSize, SectionSize } from '$lib/utils/bulma.types.js';

export type ContainerOptions = BulmaClassOptions & {
	widescreen?: boolean;
	fullhd?: boolean;
	maxWidescreen?: boolean;
	maxDesktop?: boolean;
	fluid?: boolean;
};

export class ContainerClass extends BulmaClassComponent<ContainerOptions> {
	constructor() {
		super('container', {
			widescreen: isKey,
			fullhd: isKey,
			maxWidescreen: isKey,
			maxDesktop: isKey,
			fluid: isKey,
		});
	}
}

export class FooterClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('footer', {});
	}
}

export type HeroOptions = BulmaClassOptions & {
	color?: Colors;
	size?: HeroSize;
	fullheightWithNavbar?: boolean;
};

export class HeroClass extends BulmaClassComponent<HeroOptions> {
	constructor() {
		super('hero', {
			color: isVal,
			size: isVal,
			fullheightWithNavbar: isKey,
		});
	}
}

export class HeroHeadClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('hero-head', {});
	}
}

export class HeroBodyClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('hero-body', {});
	}
}

export class HeroFootClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('hero-foot', {});
	}
}

export type LevelOptions = BulmaClassOptions & {
	mobile?: boolean;
};

export class LevelClass extends BulmaClassComponent<LevelOptions> {
	constructor() {
		super('level', {
			mobile: isKey,
		});
	}
}

export class LevelLeftClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('level-left', {});
	}
}

export class LevelRightClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('level-right', {});
	}
}

export class LevelItemClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('level-item', {});
	}
}

export class MediaClass extends BulmaClassComponent<BulmaClassOptions> {
	constructor() {
		super('media', {});
	}
}

export type SectionOptions = BulmaClassOptions & {
	size?: SectionSize;
};

export class SectionClass extends BulmaClassComponent<SectionOptions> {
	constructor() {
		super('secction', {
			size: isVal,
		});
	}
}

export const containerClass = new ContainerClass();
export const footerClass = new FooterClass();
export const heroClass = new HeroClass();
export const heroHeadClass = new HeroHeadClass();
export const heroBodyClass = new HeroBodyClass();
export const heroFootClass = new HeroFootClass();
export const levelClass = new LevelClass();
export const levelLeftClass = new LevelLeftClass();
export const levelRightClass = new LevelRightClass();
export const levelItemClass = new LevelItemClass();
export const mediaClass = new MediaClass();
export const sectionClass = new SectionClass();
