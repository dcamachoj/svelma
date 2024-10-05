<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { block } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = block.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
