<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors, ContentSize } from '$lib/utils/bulma.js';
	import IconText from '$lib/bulma/common/IconText.svelte';
	import Delete from '$lib/bulma/common/Delete.svelte';

	export let bulma: BulmaHelper = {};
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;
	export let color: Colors | 'dark' | undefined = undefined;
	export let size: ContentSize | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'message',
		{
			[`is-${color}`]: color != undefined,
			[`is-${size}`]: size != undefined
		}
	]);
</script>

<article class={cls}>
	{#if icon || text}
		<div class="message-header">
			<IconText {icon} {text} />
			<Delete on:click />
		</div>
	{/if}
	<div class="message-body">
		<slot />
	</div>
</article>
