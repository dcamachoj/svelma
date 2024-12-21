<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { paginationListClass } from './pagination.js';

	export let opts: BulmaOptions = {};

	$: cls = paginationListClass.cls({ opts });
</script>

<ul class={cls}>
	<slot />
</ul>
