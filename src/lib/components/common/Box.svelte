<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { box } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = box.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
