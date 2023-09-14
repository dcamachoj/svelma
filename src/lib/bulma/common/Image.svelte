<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, ImageSize } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let imgSrc: string | undefined;
	export let imgAlt: string = 'image';
	export let size: ImageSize | undefined = undefined;
	export let isRounded: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'image',
		{
			[`is-${size}`]: size != undefined,
			'is-rounded': isRounded
		}
	]);
</script>

<figure class={cls}>
	{#if imgSrc}
		<img alt={imgAlt} src={imgSrc} />
	{/if}
	<slot />
</figure>
