<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { tableBodyClass } from './table.js';

	export let opts: BulmaOptions = {};

	$: cls = tableBodyClass.cls({ opts });
</script>

<tbody class={cls}>
	<slot />
</tbody>
