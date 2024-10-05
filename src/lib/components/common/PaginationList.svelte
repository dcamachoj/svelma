<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { paginationList } from './pagination.js';

	export let opts: BulmaOptions = {};

	$: cls = paginationList.cls({ opts });
</script>

<ul class={cls}>
	<slot />
</ul>
