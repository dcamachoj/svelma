<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors, BwColors, TagSize } from '$lib/utils/bulma.js';
	import Delete from '$lib/bulma/common/Delete.svelte';

	export let bulma: BulmaHelper = {};
	export let color: Colors | BwColors | undefined = undefined;
	export let size: TagSize | undefined = undefined;
	export let isRounded: boolean = false;
	export let hasDelete: boolean = false;
	export let deleteSize: ContentSize | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'tag',
		{
			[`is-${color}`]: color != undefined,
			[`is-${size}`]: size != undefined,
			'is-rounded': isRounded
		}
	]);
</script>

<span class={cls}>
	<slot />
	{#if hasDelete}
		<Delete size={deleteSize} />
	{/if}
</span>
