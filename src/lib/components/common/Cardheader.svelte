<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { cardHeaderClass } from './card.js';
	import Icon from './Icon.svelte';

	export let opts: BulmaOptions = {};
	export let isTitleCentered: boolean = false;
	export let header: string | undefined = undefined;
	export let buttonIcon: string | undefined = undefined;

	$: cls = cardHeaderClass.cls({ opts });
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
