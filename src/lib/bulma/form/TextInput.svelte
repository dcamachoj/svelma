<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let id: string;
	export let label: string;
	export let placeholder: string | undefined = undefined;
	export let type: 'text' | 'password' | 'email' | 'tel' = 'text';
	export let value: string | undefined;
	export let valid: val.Result | undefined = undefined;
	export let action: val.Action | undefined = undefined;

	$: message = valid?.message || '';

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = target.value;
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
				{type}
				{value}
				{placeholder}
				on:input={handleInput}
				use:action.use={value}
			/>
		{:else}
			<input {id} name={id} class="input" {type} {value} {placeholder} on:input={handleInput} />
		{/if}
	</div>
	{#if message}
		<p class="help is-danger">{message}</p>
	{/if}
</div>
