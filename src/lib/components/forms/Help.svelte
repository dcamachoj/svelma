<script lang="ts">
	import type { BulmaOptions, Colors } from '$lib/utils/bulma.types.js';
	import { helpClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let color: Colors | undefined = undefined;

	$: cls = helpClass.cls({ opts, color });
</script>

<p class={cls}>
	<slot />
</p>
