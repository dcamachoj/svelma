<script lang="ts">
	import type { BulmaOptions, BwColors, Colors } from '$lib/utils/bulma.types.js';
	import { tableRowClass } from './table.js';
	import TableCell from './TableCell.svelte';
	import TableHead from './TableHeading.svelte';

	export let opts: BulmaOptions = {};
	export let color: Colors | BwColors | undefined = undefined;
	export let selected: boolean = false;

	$: cls = tableRowClass.cls({ opts, color, selected });
</script>

<tr class={cls}>
	<slot {TableCell} {TableHead} />
</tr>
