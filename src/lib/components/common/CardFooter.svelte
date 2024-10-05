<script lang="ts">
	import { bulmaClassnames } from '$lib/utils/bulma.js';
	import type { Action, BulmaOptions } from '$lib/utils/bulma.types.js';
	import IconText from './IconText.svelte';

	export let opts: BulmaOptions = {};
	export let actions: Action[];

	$: cls = bulmaClassnames(opts, ['card-footer']);
</script>

<footer class={cls}>
	{#each actions as action}
		{#if action.href}
			<a href={action.href} class="card-footer-item">
				<IconText icon={action.icon} text={action.text} />
			</a>
		{:else if action.click}
			<a href="/" class="card-footer-item" on:click|preventDefault={action.click}>
				<IconText icon={action.icon} text={action.text} />
			</a>
		{/if}
	{/each}
	<slot />
</footer>
