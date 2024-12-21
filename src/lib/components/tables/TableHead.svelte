<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { tableHeadClass } from './table.js';

	export let opts: BulmaOptions = {};

	$: cls = tableHeadClass.cls({ opts });
</script>

<thead class={cls}>
	<slot />
</thead>
