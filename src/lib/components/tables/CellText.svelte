<script lang="ts">
	import { type GridCellFn, type GridColumn } from './grid.js';

	export let col: GridColumn<any>;
	export let row: any;
	export let colIdx: number;
	export let rowIdx: number;
	export let options: {
		text: GridCellFn<any, string>;
		classFn?: GridCellFn<any, string>;
		empty?: string;
		tooltip?: GridCellFn<any, string>;
	};

	$: value = options.text({ col, row, colIdx, rowIdx }) || options.empty || '';
</script>

<span>
	{#if value}
		{value}
	{:else}
		&nbsp;
	{/if}
</span>
