<script lang="ts">
	import type { Action, Result } from '$lib/utils/validators.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let id: string;
	export let label: string;
	export let placeholder: string | undefined = undefined;
	export let value: number | undefined;
	export let step: number | undefined = undefined;
	export let valid: Result | undefined = undefined;
	export let action: Action | undefined = undefined;

	$: message = valid?.message || '';

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = +target.value;
		dispatch('value-changed', { name: id, value });
	};
</script>

<div class="field">
	<label for={id} class="label">{label}</label>
	<div class="control">
		{#if action}
			<input
				{id}
				name={id}
				class="input"
				type="number"
				{value}
				{placeholder}
				{step}
				on:input={handleInput}
				use:action.use={value}
			/>
		{:else}
			<input
				{id}
				name={id}
				class="input"
				type="number"
				{value}
				{placeholder}
				{step}
				on:input={handleInput}
			/>
		{/if}
	</div>
	{#if message}
		<p class="help is-danger">{message}</p>
	{/if}
</div>
