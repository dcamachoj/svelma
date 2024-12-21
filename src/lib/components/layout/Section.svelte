<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { sectionClass } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = sectionClass.cls({ opts });
</script>

<section class={cls}>
	<slot />
</section>
