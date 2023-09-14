<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let color: Colors | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'panel',
		{
			[`is-${color}`]: color != undefined
		}
	]);
</script>

<div class={cls}>
	<slot />
</div>
