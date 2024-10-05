<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { tableFoot } from './table.js';

	export let opts: BulmaOptions = {};

	$: cls = tableFoot.cls({ opts });
</script>

<tfoot class={cls}>
	<slot />
</tfoot>
