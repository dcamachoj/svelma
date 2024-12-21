<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { paginationEllipsisClass } from './pagination.js';

	export let opts: BulmaOptions = {};

	$: cls = paginationEllipsisClass.cls({ opts });
</script>

<li>
	<span class={cls}><slot>&hellip;</slot></span>
</li>
