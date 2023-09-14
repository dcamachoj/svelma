<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';
	import Icon from '$lib/bulma/common/Icon.svelte';

	export let bulma: BulmaHelper = {};
	export let isTitleCentered: boolean = false;
	export let header: string | undefined = undefined;
	export let buttonIcon: string | undefined = undefined;

	$: cls = bulmaHelper(bulma, 'card-header');
</script>

<header class={cls}>
	<div class="card-header-title" class:is-centered={isTitleCentered}>
		{#if header}
			{header}
		{/if}
		<slot />
		{#if $$slots.button || buttonIcon}
			<button class="card-header-icon" on:click>
				{#if buttonIcon}
					<Icon icon={buttonIcon} />
				{/if}
				{#if $$slots.button}
					<slot name="button" />
				{/if}
			</button>
		{/if}
	</div>
</header>
