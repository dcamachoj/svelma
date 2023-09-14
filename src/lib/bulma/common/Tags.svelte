<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let hasAddons: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'tags',
		{
			'has-addons': hasAddons
		}
	]);
</script>

<div class={cls}>
	<slot />
</div>
