<script lang="ts">
	import type { BulmaOptions, BwColors, Colors, TextAlign } from '$lib/utils/bulma.types.js';
	import { tableCell } from './table.js';

	export let opts: BulmaOptions = {};
	export let color: Colors | BwColors | undefined = undefined;
	export let align: TextAlign | undefined = undefined;

	$: cls = tableCell.cls({ opts, color, align });
</script>

<th class={cls}>
	<slot />
</th>
