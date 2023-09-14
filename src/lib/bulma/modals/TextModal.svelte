<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { icons, type Icons } from '$lib/bulma/common/icons.js';

	import Button from '$lib/bulma/common/Button.svelte';
	import ModalCard from '$lib/bulma/common/ModalCard.svelte';
	import type { Result, Action } from '$lib/utils/validators.js';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let active: boolean;
	export let header: string;
	export let label: string;
	export let type: 'text' | 'password' | 'email' | 'tel' | 'number' = 'text';
	export let value: string | undefined;
	export let valid: Result | undefined = undefined;
	export let action: Action | undefined = undefined;
	export let okLabel: string = 'Guardar';
	export let okIcon: Icons = 'save';
	export let clrLabel: string = '';
	export let clrIcon: Icons = 'trash';

	let loading: boolean = false;

	$: if (active) onOpen();
	$: isValid = valid == undefined || valid.valid;
	$: isDirty = valid == undefined || valid.dirty;
	$: message = valid?.message || '';

	function onOpen() {
		loading = false;
	}
	function onClose() {
		active = false;
	}
	function onClear() {
		dispatch('clear', null);
	}
	function onSave() {
		if (!isValid || !isDirty) return;
		loading = true;
		dispatch('accept');
	}
	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = target.value;
		dispatch('value-changed', { name: id, value });
	};
</script>

<ModalCard {active} {header}>
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
					on:input={handleInput}
					use:action.use={value}
				/>
			{:else}
				<input {id} name={id} class="input" {type} {value} on:input={handleInput} />
			{/if}
		</div>
		{#if message}
			<p class="help is-danger">{message}</p>
		{/if}
	</div>
	<div slot="actions">
		<Button
			{loading}
			disabled={!isValid || !isDirty}
			icon={icons[okIcon]}
			text={okLabel}
			color="primary"
			on:click={onSave}
		/>
		{#if clrLabel}
			<Button {loading} icon={icons[clrIcon]} text={clrLabel} color="info" on:click={onClear} />
		{/if}
		<Button {loading} icon={icons.cancel} text="Cancelar" on:click={onClose} />
	</div>
</ModalCard>
