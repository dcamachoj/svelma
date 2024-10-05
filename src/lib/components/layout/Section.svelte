<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { section } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = section.cls({ opts });
</script>

<section class={cls}>
	<slot />
</section>
