<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { tableContainerClass } from './table.js';
	import Table from './Table.svelte';

	export let opts: BulmaOptions = {};

	$: cls = tableContainerClass.cls({ opts });
</script>

<div class={cls}>
	<slot {Table} />
</div>
