<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import type { FieldValidator, UseInput } from '$lib/utils/validation.js';
	import { mdiCancel, mdiPencil } from '@mdi/js';
	import Field from './Field.svelte';

	export let id: string;
	export let validator: FieldValidator;
	export let use: UseInput | undefined = undefined;
	export let label: string = '';
	export let error: string = '';
</script>

<Field let:Control let:Label let:Help>
	<Label {id}>{label || validator.title}</Label>
	<Control iconLeft>
		{#if !use}
			<input {id} name={id} class="input" type="text" placeholder={validator.title} readonly />
		{:else}
			<input
				{id}
				name={id}
				class="input"
				type="text"
				placeholder={validator.title}
				{...validator.constraints}
				use:use
			/>
		{/if}
		<Icon icon={use ? mdiPencil : mdiCancel} size="small" iconClass="is-left" />
	</Control>
	{#if error}
		<Help color="danger">{error}</Help>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
</style>
