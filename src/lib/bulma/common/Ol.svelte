<script lang="ts">
	import { bulmaHelper, type BulmaHelper, type OlType } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let type: OlType | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'box',
		{
			[`is-${type}`]: type != undefined
		}
	]);
</script>

<div class={cls}>
	<slot />
</div>
