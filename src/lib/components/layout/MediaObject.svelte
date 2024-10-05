<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { media } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = media.cls({ opts });
</script>

<article class={cls}>
	<slot />
</article>
