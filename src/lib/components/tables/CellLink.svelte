<script lang="ts">
	import { type GridCellFn, type GridColumn } from './grid.js';
	import Button from '$lib/components/common/Button.svelte';
	import IconText from '$lib/components/common/IconText.svelte';
	import type { ButtonColor, ButtonSize } from '$lib/utils/bulma.types.js';

	export let col: GridColumn<any>;
	export let row: any;
	export let colIdx: number;
	export let rowIdx: number;
	export let options: {
		icon?: GridCellFn<any, string>;
		text?: GridCellFn<any, string>;
		classFn?: GridCellFn<any, string>;
		href: GridCellFn<any, string>;
		empty?: string;
		tooltip?: GridCellFn<any, string>;
		color?: GridCellFn<any, ButtonColor>;
		size?: GridCellFn<any, ButtonSize>;
	};
</script>

<Button
	element="a"
	color={options.color ? options.color({ col, row, colIdx, rowIdx }) : undefined}
	size={options.size ? options.size({ col, row, colIdx, rowIdx }) : undefined}
	href={options.href({ col, row, colIdx, rowIdx })}
>
	<IconText
		icon={options.icon ? options.icon({ col, row, colIdx, rowIdx }) : undefined}
		text={options.text ? options.text({ col, row, colIdx, rowIdx }) : undefined}
	/>
</Button>
