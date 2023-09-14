<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, MediaAlign } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let align: MediaAlign | undefined = undefined;

	$: cls = bulmaHelper(bulma, align ? `media-${align}` : 'media-content');
</script>

<div class={cls}>
	<slot />
</div>
