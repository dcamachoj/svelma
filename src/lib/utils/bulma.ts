import { writable, type Writable } from 'svelte/store';
import type { BulmaOptions } from './bulma.types.js';
import { classnames, type ClsArgument } from './classnames.js';
import { getContext, setContext } from 'svelte';

export function bulmaClassnames(opts: BulmaOptions = {}, className: ClsArgument = ''): string {
	return classnames(className, opts.classArg || '', {
		[`has-text-${opts.textColor}`]: opts.textColor,
		[`has-background-${opts.backColor}`]: opts.backColor,

		[`m-${opts.m}`]: opts.m != undefined,
		[`mx-${opts.mx}`]: opts.mx != undefined,
		[`my-${opts.my}`]: opts.my != undefined,
		[`mt-${opts.mt}`]: opts.mt != undefined,
		[`mb-${opts.mb}`]: opts.mb != undefined,
		[`ml-${opts.ml}`]: opts.ml != undefined,
		[`mr-${opts.mr}`]: opts.mr != undefined,

		[`p-${opts.p}`]: opts.p != undefined,
		[`px-${opts.px}`]: opts.px != undefined,
		[`py-${opts.py}`]: opts.py != undefined,
		[`pt-${opts.pt}`]: opts.pt != undefined,
		[`pb-${opts.pb}`]: opts.pb != undefined,
		[`pl-${opts.pl}`]: opts.pl != undefined,
		[`pr-${opts.pr}`]: opts.pr != undefined,

		[`is-size-${opts.textSize}`]: opts.textSize,
		[`is-size-${opts.textSizeMobile}-mobile`]: opts.textSizeMobile,
		[`is-size-${opts.textSizeTouch}-touch`]: opts.textSizeTouch,
		[`is-size-${opts.textSizeTablet}-tablet`]: opts.textSizeTablet,
		[`is-size-${opts.textSizeDesktop}-desktop`]: opts.textSizeDesktop,
		[`is-size-${opts.textSizeWidescreen}-widescreen`]: opts.textSizeWidescreen,
		[`is-size-${opts.textSizeFullhd}-fullhd`]: opts.textSizeFullhd,

		[`has-text-${opts.textAlign}`]: opts.textAlign,
		[`has-text-${opts.textAlignMobile}-mobile`]: opts.textAlignMobile,
		[`has-text-${opts.textAlignTouch}-touch`]: opts.textAlignTouch,
		[`has-text-${opts.textAlignTabletOnly}-tablet-only`]: opts.textAlignTabletOnly,
		[`has-text-${opts.textAlignTablet}-tablet`]: opts.textAlignTablet,
		[`has-text-${opts.textAlignDesktopOnly}-desktop-only`]: opts.textAlignDesktopOnly,
		[`has-text-${opts.textAlignDesktop}-desktop`]: opts.textAlignDesktop,
		[`has-text-${opts.textAlignWidescreenOnly}-widescreen-only`]: opts.textAlignWidescreenOnly,
		[`has-text-${opts.textAlignWidescreen}-widescreen`]: opts.textAlignWidescreen,
		[`has-text-${opts.textAlignFullhd}-fullhd`]: opts.textAlignFullhd,

		[`is-${opts.textTransform}`]: opts.textTransform,
		[`has-text-weight-${opts.textWeight}`]: opts.textWeight,
		[`is-family-${opts.fontFamily}`]: opts.fontFamily,

		[`is-${opts.display}`]: opts.display,
		[`is-${opts.display}-mobile`]: opts.displayMobile,
		[`is-${opts.display}-tablet-only`]: opts.displayTabletOnly,
		[`is-${opts.display}-desktop-only`]: opts.displayDesktopOnly,
		[`is-${opts.display}-widescreen-only`]: opts.displayWidescreenOnly,
		[`is-${opts.display}-touch`]: opts.displayTouch,
		[`is-${opts.display}-tablet`]: opts.displayTablet,
		[`is-${opts.display}-desktop`]: opts.displayDesktop,
		[`is-${opts.display}-widescreen`]: opts.displayWidescreen,
		[`is-${opts.display}-fullhd`]: opts.displayFullhd,

		[`is-${opts.hidden}`]: opts.hidden,
		[`is-${opts.hidden}-mobile`]: opts.hiddenMobile,
		[`is-${opts.hidden}-tablet-only`]: opts.hiddenTabletOnly,
		[`is-${opts.hidden}-desktop-only`]: opts.hiddenDesktopOnly,
		[`is-${opts.hidden}-widescreen-only`]: opts.hiddenWidescreenOnly,
		[`is-${opts.hidden}-touch`]: opts.hiddenTouch,
		[`is-${opts.hidden}-tablet`]: opts.hiddenTablet,
		[`is-${opts.hidden}-desktop`]: opts.hiddenDesktop,
		[`is-${opts.hidden}-widescreen`]: opts.hiddenWidescreen,
		[`is-${opts.hidden}-fullhd`]: opts.hiddenFullhd,

		'is-invisible': opts.invisible,
		'is-sr-only': opts.srOnly,

		'is-flex': opts.flexDir || opts.alignContent || opts.alignItems || opts.justifyContent,
		[`is-flex-direction-${opts.flexDir}`]: opts.flexDir,
		[`is-flex-wrap-${opts.flexWrap}`]: opts.flexWrap,
		[`is-justify-content-${opts.justifyContent}`]: opts.justifyContent,
		[`is-align-content-${opts.alignContent}`]: opts.alignContent,
		[`is-align-items-${opts.alignItems}`]: opts.alignItems,
		[`is-align-self-${opts.alignSelf}`]: opts.alignSelf,
		[`is-flex-grow-${opts.flex || opts.flexGrow}`]:
			opts.flex != undefined || opts.flexGrow != undefined,
		[`is-flex-shrink-${opts.flex || opts.flexShrink}`]:
			opts.flex != undefined || opts.flexShrink != undefined,

		'is-clearfix': opts.clearfix,
		'is-pulled-left': opts.pulledLeft,
		'is-pulled-right': opts.pulledRight,
		'is-overlay': opts.overlay,
		'is-clipped': opts.clipped,
		'is-radiusless': opts.radiusless,
		'is-shadowless': opts.shadowless,
		'is-unselectable': opts.unselectable,
		'is-clickable': opts.clickable,
		'is-relative': opts.relative,
	});
}

export const isKey = 'is-$';
export const isVal = 'is-#';
export const hasKey = 'has-$';
export type ActiveId = string | null;
export type ActiveIdContext = Writable<ActiveId>;

export type BulmaClassOptions = {
	opts?: BulmaOptions;
};
export type BulmaClassTypeFunction = (key: string, val: any, sKey: string) => any;
export type BulmaClassType = string | string[] | BulmaClassTypeFunction;

export class BulmaClassComponent<T extends BulmaClassOptions> {
	constructor(
		readonly args: ClsArgument,
		protected readonly fields: Record<keyof Omit<T, 'opts' | 'classArg'>, BulmaClassType>,
	) {}
	cls(opts: T): string {
		opts = this.overrideValue(opts);
		const opt = opts.opts;
		const arg: Record<string, any> = {};
		Object.entries(opts)
			.filter(([key]) => key !== 'opts' && key !== 'classArg' && key in this.fields)
			.forEach(([key, val]) => {
				const sKey = this.keyToSnake(key);
				let field: BulmaClassType = this.fields[key as keyof T];
				switch (typeof field) {
					case 'string':
						arg[this.getArgKey(key, val, sKey, field)] = val;
						break;
					case 'function':
						arg[field(key, val, sKey)] = val;
						break;
					default:
						if (Array.isArray(field)) {
							field.forEach((f) => {
								arg[this.getArgKey(key, val, sKey, f)] = val;
							});
						}
						break;
				}
			});
		return bulmaClassnames(opt, [this.args, arg]);
	}

	protected keyToSnake(key: string) {
		return key.replace(/[A-Z]/g, (s) => `-${s.toLowerCase()}`);
	}
	protected getArgKey(key: string, val: any, sKey: string, format: string) {
		return format.replace(/[$]/g, sKey).replace(/[#]/g, val);
	}
	protected keyPrefix(key: string, prefix: string) {
		if (prefix.endsWith('-')) {
			return prefix.slice(0, -1) + this.keyToSnake(key);
		}
		return prefix;
	}
	protected overrideValue(src: T): T {
		return src;
	}
}

export function getActiveContent() {
	return getContext<ActiveIdContext>('active');
}
export function setActiveContext() {
	setContext<ActiveIdContext>('active', writable<ActiveId>());
}
export function newComponentId() {
	return crypto.randomUUID();
}
