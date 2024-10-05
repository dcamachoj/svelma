<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { table } from './table.js';
	import TableBody from './TableBody.svelte';
	import TableCell from './TableCell.svelte';
	import TableFoot from './TableFoot.svelte';
	import TableHead from './TableHead.svelte';
	import TableHeading from './TableHeading.svelte';
	import TableRow from './TableRow.svelte';

	export let opts: BulmaOptions = {};
	export let bordered: boolean = false;
	export let striped: boolean = false;
	export let narrow: boolean = false;
	export let hoverable: boolean = false;
	export let fullwidth: boolean = false;

	$: cls = table.cls({ opts, bordered, striped, narrow, hoverable, fullwidth });
</script>

<table class={cls}>
	<slot {TableCell} {TableHeading} {TableRow} {TableHead} {TableBody} {TableFoot} />
</table>
