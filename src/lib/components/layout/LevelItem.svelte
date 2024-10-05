<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { levelItem } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = levelItem.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
