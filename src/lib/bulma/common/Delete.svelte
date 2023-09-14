<script lang="ts">
	import type { BulmaHelper, ContentSize } from '$lib/utils/bulma.js';
	import { bulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let size: ContentSize | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'delete',
		{
			[`is-${size}`]: size != undefined
		}
	]);
</script>

<button class={cls} on:click />
