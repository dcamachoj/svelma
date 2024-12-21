<script lang="ts">
	import type { BulmaOptions, ColumnGap } from '$lib/utils/bulma.types.js';
	import Column from './Column.svelte';
	import { columnsClass } from './columns.js';

	export let opts: BulmaOptions = {};
	export let gapless: boolean = false;
	export let multiline: boolean = false;
	export let centered: boolean = false;
	export let vCentered: boolean = false;
	export let gap: ColumnGap | undefined = undefined;
	export let gapMobile: ColumnGap | undefined = undefined;
	export let gapTablet: ColumnGap | undefined = undefined;
	export let gapTouch: ColumnGap | undefined = undefined;
	export let gapDesktop: ColumnGap | undefined = undefined;
	export let gapWidescreen: ColumnGap | undefined = undefined;
	export let gapFullHD: ColumnGap | undefined = undefined;

	$: cls = columnsClass.cls({
		opts,
		gapless,
		multiline,
		centered,
		vCentered,
		gap,
		gapMobile,
		gapTablet,
		gapTouch,
		gapDesktop,
		gapWidescreen,
		gapFullHD,
	});
</script>

<div class={cls}>
	<slot {Column} />
</div>
