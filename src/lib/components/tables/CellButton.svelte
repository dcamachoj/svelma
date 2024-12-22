<script lang="ts">
	import Button from '$lib/components/common/Button.svelte';
	import IconText from '$lib/components/common/IconText.svelte';
	import type { ButtonColor, ButtonSize } from '$lib/utils/bulma.types.js';
	import type { GridCellFn, GridColumn } from './grid.js';

	export let col: GridColumn<any>;
	export let row: any;
	export let options: {
		icon?: GridCellFn<any, string>;
		text?: GridCellFn<any, string>;
		classFn?: GridCellFn<any, string>;
		click: GridCellFn<any, void>;
		empty?: string;
		tooltip?: GridCellFn<any, string>;
		color?: GridCellFn<any, ButtonColor>;
		size?: GridCellFn<any, ButtonSize>;
	};
</script>

<Button
	element="button"
	color={options.color ? options.color(col, row) : undefined}
	size={options.size ? options.size(col, row) : undefined}
	on:click={() => options.click(col, row)}
>
	<IconText
		icon={options.icon ? options.icon(col, row) : undefined}
		text={options.text ? options.text(col, row) : undefined}
	/>
</Button>
