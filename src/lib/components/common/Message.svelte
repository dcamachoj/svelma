<script lang="ts">
	import type { BulmaOptions, Colors, ContentSize } from '$lib/utils/bulma.types.js';
	import MessageBody from './MessageBody.svelte';
	import MessageHeader from './MessageHeader.svelte';
	import { message } from './misc.js';

	export let opts: BulmaOptions = {};
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;
	export let color: Colors | 'dark' | undefined = undefined;
	export let size: ContentSize | undefined = undefined;

	$: cls = message.cls({ opts, color, size });
</script>

<article class={cls}>
	<slot name="header" {MessageHeader}>
		{#if icon || text}
			<MessageHeader {icon} {text} on:click />
		{/if}
	</slot>
	<slot name="body" {MessageBody}>
		<MessageBody><slot /></MessageBody>
	</slot>
</article>
