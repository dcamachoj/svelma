<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { paginationEllipsis } from './pagination.js';

	export let opts: BulmaOptions = {};

	$: cls = paginationEllipsis.cls({ opts });
</script>

<li>
	<span class={cls}><slot>&hellip;</slot></span>
</li>
