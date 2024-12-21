<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { mediaClass } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = mediaClass.cls({ opts });
</script>

<article class={cls}>
	<slot />
</article>
