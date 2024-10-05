<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { tableHead } from './table.js';

	export let opts: BulmaOptions = {};

	$: cls = tableHead.cls({ opts });
</script>

<thead class={cls}>
	<slot />
</thead>
