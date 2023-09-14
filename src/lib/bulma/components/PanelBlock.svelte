<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let href: string | undefined;
	export let isButton: boolean = false;

	$: cls = bulmaHelper(bulma, 'panel-block');
</script>

{#if href}
	<a {href} class={cls}>
		<slot />
	</a>
{:else if isButton}
	<a href="/" class={cls} on:click|preventDefault>
		<slot />
	</a>
{:else}
	<div class={cls}>
		<slot />
	</div>
{/if}
