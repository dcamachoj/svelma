<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { tableBody } from './table.js';

	export let opts: BulmaOptions = {};

	$: cls = tableBody.cls({ opts });
</script>

<tbody class={cls}>
	<slot />
</tbody>
