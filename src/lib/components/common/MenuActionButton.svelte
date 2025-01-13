<script lang="ts">
	import Button from '$lib/components/common/Button.svelte';
	import type { MenuAction } from '$lib/utils/stores.js';
	import { writable, type Readable } from 'svelte/store';

	export let action: MenuAction;

	let disabled: Readable<boolean>;

	$: size = action.size;
	$: title = action.title;
	$: disabled =
		typeof action.disabled == 'boolean'
			? writable(action.disabled)
			: action.disabled || writable(false);
</script>

{#if action.href}
	<Button
		element="a"
		href={action.href}
		color={action.color}
		{size}
		{title}
		icon={action.icon}
		text={action.text}
	/>
{:else if action.click}
	<Button
		element="button"
		color={action.color}
		on:click={action.click}
		{size}
		{title}
		disabled={$disabled || undefined}
		icon={action.icon}
		text={action.text}
	/>
{/if}
