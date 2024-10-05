<script lang="ts">
	import type { ColumnGap } from '$lib/utils/bulma.types.js';
	import { classnames } from '$lib/utils/classnames.js';
	import Column from './Column.svelte';

	export let isGapless: boolean = false;
	export let isMultiline: boolean = false;
	export let isCentered: boolean = false;
	export let isVCentered: boolean = false;
	export let gap: ColumnGap | undefined = undefined;
	export let gapMobile: ColumnGap | undefined = undefined;
	export let gapTablet: ColumnGap | undefined = undefined;
	export let gapTouch: ColumnGap | undefined = undefined;
	export let gapDesktop: ColumnGap | undefined = undefined;
	export let gapWidescreen: ColumnGap | undefined = undefined;
	export let gapFullHD: ColumnGap | undefined = undefined;

	$: cls = classnames('columns', {
		'is-gapless': isGapless,
		'is-multiline': isMultiline,
		'is-centered': isCentered,
		'is-vcentered': isVCentered,
		[`is-${gap}`]: gap != undefined,
		[`is-${gap}-mobile`]: gapMobile != undefined,
		[`is-${gap}-tablet`]: gapTablet != undefined,
		[`is-${gap}-touch`]: gapTouch != undefined,
		[`is-${gap}-desktop`]: gapDesktop != undefined,
		[`is-${gap}-widescreen`]: gapWidescreen != undefined,
		[`is-${gap}-fullhd`]: gapFullHD != undefined
	});
</script>

<div class={cls}>
	<slot {Column} />
</div>
