<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';
	import Icon from '$lib/bulma/common/Icon.svelte';

	export let bulma: BulmaHelper = {};
	export let iconLeft: string | undefined = undefined;
	export let iconRight: string | undefined = undefined;
	export let isExpanded: boolean = false;
	export let isLoading: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'control',
		{
			'has-icons-left': iconLeft != undefined,
			'has-icons-right': iconRight != undefined,
			'is-expanded': isExpanded,
			'is-loading': isLoading
		}
	]);
</script>

<div class={cls}>
	<slot />
	{#if iconLeft}
		<Icon icon={iconLeft} iconClass="icon is-left is-small" />
	{/if}
	{#if iconRight}
		<Icon icon={iconRight} iconClass="icon is-right is-small" />
	{/if}
</div>
