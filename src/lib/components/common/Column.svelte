<script lang="ts">
	import type { BulmaOptions, ColumnSize } from '$lib/utils/bulma.types.js';
	import { columnClass } from './columns.js';

	export let opts: BulmaOptions = {};
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
	export let narrow: boolean = false;
	export let narrowMobile: boolean = false;
	export let narrowTablet: boolean = false;
	export let narrowTouch: boolean = false;
	export let narrowDesktop: boolean = false;
	export let narrowWidescreen: boolean = false;
	export let narrowFullHD: boolean = false;

	$: cls = columnClass.cls({
		opts,
		size,
		sizeMobile,
		sizeTablet,
		sizeTouch,
		sizeDesktop,
		sizeWidescreen,
		sizeFulHD,
		offset,
		offsetMobile,
		offsetTablet,
		offsetTouch,
		offsetDesktop,
		offsetWidescreen,
		offsetFullHD,
		narrow,
		narrowMobile,
		narrowTablet,
		narrowTouch,
		narrowDesktop,
		narrowWidescreen,
		narrowFullHD,
	});
</script>

<div class={cls}>
	<slot />
</div>
