<script lang="ts">
	import { type GridCellFn, type GridColumn } from './grid.js';

	export let col: GridColumn<any>;
	export let row: any;
	export let options: {
		text: GridCellFn<any, string>;
		classFn?: GridCellFn<any, string>;
		empty?: string;
		tooltip?: GridCellFn<any, string>;
	};

	$: value = options.text(col, row) || options.empty || '';
</script>

<span>
	{#if value}
		{value}
	{:else}
		&nbsp;
	{/if}
</span>
