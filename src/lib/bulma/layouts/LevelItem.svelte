<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let hasTextCentered: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'level-item',
		{
			'has-text-centered': hasTextCentered
		}
	]);
</script>

<div class={cls}>
	<slot />
</div>
