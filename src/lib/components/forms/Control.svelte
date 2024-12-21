<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import Label from './Label.svelte';
	import { controlClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let iconsLeft: boolean = false;
	export let iconsRight: boolean = false;
	export let expanded: boolean = false;
	export let loading: boolean = false;

	$: cls = controlClass.cls({ opts, iconsLeft, iconsRight, expanded, loading });
</script>

<div class={cls}>
	<slot {Label} />
</div>
