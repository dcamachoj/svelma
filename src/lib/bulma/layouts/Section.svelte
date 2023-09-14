<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, SectionSize } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let size: SectionSize | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'section',
		{
			[`is-${size}`]: size != undefined
		}
	]);
</script>

<section class={cls}>
	<slot />
</section>
