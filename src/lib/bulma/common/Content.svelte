<script lang="ts">
	import { bulmaHelper, type BulmaHelper, type ContentSize } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let size: ContentSize | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'content',
		{
			[`is-${size}`]: size != undefined
		}
	]);
</script>

<div class={cls}>
	<slot />
</div>
