<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { levelLeft } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = levelLeft.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
