<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import Label from './Label.svelte';
	import { control } from './misc.js';

	export let opts: BulmaOptions = {};
	export let iconsLeft: boolean = false;
	export let iconsRight: boolean = false;
	export let expanded: boolean = false;
	export let loading: boolean = false;

	$: cls = control.cls({ opts, iconsLeft, iconsRight, expanded, loading });
</script>

<div class={cls}>
	<slot {Label} />
</div>
