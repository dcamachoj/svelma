<script lang="ts">
	import type { BulmaOptions, BwColors, Colors, TextAlign } from '$lib/utils/bulma.types.js';
	import { tableCellClass } from './table.js';

	export let opts: BulmaOptions = {};
	export let color: Colors | BwColors | undefined = undefined;
	export let align: TextAlign | undefined = undefined;

	$: cls = tableCellClass.cls({ opts, color, align });
</script>

<td class={cls}>
	<slot />
</td>
