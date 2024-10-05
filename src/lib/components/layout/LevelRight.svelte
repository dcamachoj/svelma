<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { levelRight } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = levelRight.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
