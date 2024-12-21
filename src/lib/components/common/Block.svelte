<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { blockClass } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = blockClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
