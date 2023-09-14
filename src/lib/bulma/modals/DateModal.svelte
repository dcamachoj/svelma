<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { icons, type Icons } from '$lib/bulma/common/icons.js';
	import { logger } from '$lib/utils/logger.js';

	import Button from '$lib/bulma/common/Button.svelte';
	import ModalCard from '$lib/bulma/common/ModalCard.svelte';
	import type { Action, Result } from '$lib/utils/validators.js';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let active: boolean;
	export let header: string;
	export let label: string;
	export let value: Date | undefined;
	export let step: string | number | undefined = undefined;
	export let valid: Result | undefined = undefined;
	export let action: Action | undefined = undefined;
	export let okLabel: string = 'Guardar';
	export let okIcon: Icons = 'save';
	export let clrLabel: string = '';
	export let clrIcon: Icons = 'trash';

	let loading: boolean = false;
	let sValue: string;

	$: if (active) onOpen();
	$: isValid = valid == undefined || valid.valid;
	$: isDirty = valid == undefined || valid.dirty;
	$: message = valid?.message || '';
	$: stepNumber = +(step || 0);

	function toDate(src: string): Date {
		try {
			const date = new Date(src);
			const res = new Date(date.getTime() + 60000 * date.getTimezoneOffset());
			logger.debug('DateModal.toDate', { src, res });
			return res;
		} catch (err: any) {
			return value!;
		}
	}
	function fromDate(src: Date | undefined): string {
		try {
			const now = new Date();
			const res = (src || now).toISOString().split('T')[0];
			logger.debug('DateModal.fromDate', { src, res });
			return res;
		} catch (err: any) {
			return sValue;
		}
	}
	function onOpen() {
		loading = false;
		sValue = fromDate(value);
	}
	function onClose() {
		active = false;
	}
	function onClear() {
		dispatch('clear', null);
	}
	function onSave() {
		if (!isValid || !isDirty) return;
		value = toDate(sValue);
		loading = true;
		dispatch('accept');
	}
	function onStep() {
		if (!value) return;
		const dd = value.getDay();
		const mm = value.getMonth();
		const yy = value.getFullYear() - stepNumber;
		value = new Date(yy, mm, dd);
		sValue = fromDate(value);
	}
	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = toDate(target.value);
		sValue = fromDate(value);
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
					type="date"
					value={sValue}
					on:input={handleInput}
					use:action.use={value}
				/>
			{:else}
				<input
					{id}
					name={id}
					class="input"
					type="date"
					value={sValue}
					on:input={handleInput}
					{step}
				/>
			{/if}
		</div>
		{#if message}
			<p class="help is-danger">{message}</p>
		{/if}
	</div>
	<div slot="actions">
		{#if step}
			<Button {loading} icon={icons.add} text="{stepNumber} años" on:click={onStep} />
		{/if}
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
