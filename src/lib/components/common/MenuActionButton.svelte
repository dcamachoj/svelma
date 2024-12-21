<script lang="ts">
	import Button from '$lib/components/common/Button.svelte';
	import type { MenuAction } from '$lib/utils/stores.js';
	import { writable, type Readable } from 'svelte/store';

	export let action: MenuAction;

	let disabled: Readable<boolean>;

	$: size = action.size;
	$: title = action.title;
	$: disabled = action.disabled || writable(false);
</script>

{#if action.href}
	<Button
		href={action.href}
		color={action.color}
		{size}
		{title}
		disabled={$disabled || undefined}
		icon={action.icon}
		text={action.text}
	/>
{:else if action.click}
	<Button
		color={action.color}
		on:click={action.click}
		{size}
		{title}
		disabled={$disabled || undefined}
		icon={action.icon}
		text={action.text}
	/>
{/if}
