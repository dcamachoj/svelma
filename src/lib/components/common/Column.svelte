<script lang="ts">
	import type { ColumnSize } from '$lib/utils/bulma.types.js';
	import { classnames } from '$lib/utils/classnames.js';

	export let size: ColumnSize | undefined = undefined;
	export let sizeMobile: ColumnSize | undefined = undefined;
	export let sizeTablet: ColumnSize | undefined = undefined;
	export let sizeTouch: ColumnSize | undefined = undefined;
	export let sizeDesktop: ColumnSize | undefined = undefined;
	export let sizeWidescreen: ColumnSize | undefined = undefined;
	export let sizeFulHD: ColumnSize | undefined = undefined;
	export let offset: ColumnSize | undefined = undefined;
	export let offsetMobile: ColumnSize | undefined = undefined;
	export let offsetTablet: ColumnSize | undefined = undefined;
	export let offsetTouch: ColumnSize | undefined = undefined;
	export let offsetDesktop: ColumnSize | undefined = undefined;
	export let offsetWidescreen: ColumnSize | undefined = undefined;
	export let offsetFullHD: ColumnSize | undefined = undefined;
	export let isNarrow: boolean = false;
	export let isNarrowMobile: boolean = false;
	export let isNarrowTablet: boolean = false;
	export let isNarrowTouch: boolean = false;
	export let isNarrowDesktop: boolean = false;
	export let isNarrowWidescreen: boolean = false;
	export let isNarrowFullHD: boolean = false;

	$: cls = classnames('column', {
		[`is-${size}`]: size != undefined,
		[`is-${sizeMobile}-mobile`]: sizeMobile != undefined,
		[`is-${sizeTablet}-tablet`]: sizeTablet != undefined,
		[`is-${sizeTouch}-touch`]: sizeTouch != undefined,
		[`is-${sizeDesktop}-desktop`]: sizeDesktop != undefined,
		[`is-${sizeWidescreen}-widescreen`]: sizeWidescreen != undefined,
		[`is-${sizeFulHD}-fullhd`]: sizeFulHD != undefined,
		[`is-offset-${offset}`]: offset != undefined,
		[`is-offset-${offsetMobile}-mobile`]: offsetMobile != undefined,
		[`is-offset-${offsetTablet}-tablet`]: offsetTablet != undefined,
		[`is-offset-${offsetTouch}-touch`]: offsetTouch != undefined,
		[`is-offset-${offsetDesktop}-desktop`]: offsetDesktop != undefined,
		[`is-offset-${offsetWidescreen}-widescreen`]: offsetWidescreen != undefined,
		[`is-offset-${offsetFullHD}-fullhd`]: offsetFullHD != undefined,
		'is-narrow': isNarrow,
		'is-narrow-mobile': isNarrowMobile,
		'is-narrow-tablet': isNarrowTablet,
		'is-narrow-touch': isNarrowTouch,
		'is-narrow-desktop': isNarrowDesktop,
		'is-narrow-widescreen': isNarrowWidescreen,
		'is-narrow-fullhd': isNarrowFullHD
	});
</script>

<div class={cls}>
	<slot />
</div>
