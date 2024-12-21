<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { tableFootClass } from './table.js';

	export let opts: BulmaOptions = {};

	$: cls = tableFootClass.cls({ opts });
</script>

<tfoot class={cls}>
	<slot />
</tfoot>
