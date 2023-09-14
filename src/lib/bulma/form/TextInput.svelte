<script lang="ts">
	import type { Action, Result } from '$lib/utils/validators.js';
	import { createEventDispatcher } from 'svelte';
	import type { Colors, InputSize } from '$lib/utils/bulma.js';
	import { classnames } from '$lib/utils/classnames.js';

	const dispatch = createEventDispatcher();
	export let id: string;
	export let label: string;
	export let placeholder: string | undefined = undefined;
	export let type: 'text' | 'password' | 'email' | 'tel' = 'text';
	export let value: string | undefined;
	export let valid: Result | undefined = undefined;
	export let action: Action | undefined = undefined;
	export let color: Colors | undefined = undefined;
	export let size: InputSize | undefined = undefined;
	export let isRounded: boolean = false;
	export let isLoading: boolean = false;

	$: message = valid?.message || '';
	$: clsInput = classnames('input', {
		[`is-${color}`]: color != undefined,
		[`is-${size}`]: size != undefined,
		'is-rounded': isRounded
	});

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = type === 'number' ? +target.value : target.value;
		dispatch('value-changed', { name: id, value });
	};
</script>

<div class="field">
	<label for={id} class="label">{label}</label>
	<div class="control" class:is-loading={isLoading}>
		{#if action}
			<input
				{id}
				name={id}
				class={clsInput}
				{type}
				{value}
				{placeholder}
				on:input={handleInput}
				use:action.use={value}
			/>
		{:else}
			<input {id} name={id} class={clsInput} {type} {value} {placeholder} on:input={handleInput} />
		{/if}
	</div>
	{#if message}
		<p class="help is-danger">{message}</p>
	{/if}
</div>
