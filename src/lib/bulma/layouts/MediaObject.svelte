<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};

	$: cls = bulmaHelper(bulma, 'media');
</script>

<article class={cls}>
	<slot />
</article>
