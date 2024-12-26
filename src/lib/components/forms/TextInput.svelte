<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import type { I18n } from '$lib/utils/i18n.js';
	import type { FieldValidator, UseInput } from '$lib/utils/validation.js';
	import { mdiCancel, mdiPencil } from '@mdi/js';
	import type { Writable } from 'svelte/store';
	import Field from './Field.svelte';

	export let validator: FieldValidator;
	export let error: Writable<string> | undefined = undefined;
	export let i18n: I18n;
	export let use: UseInput | undefined = undefined;

	let err: string = '';

	$: id = validator.field;
	$: label = validator.label(i18n);
	$: err = error && $error ? i18n.s($error) : '';
</script>

<Field let:Control let:Label let:Help>
	<Label {id}>{label}</Label>
	<Control iconsLeft>
		{#if use}
			<input
				{id}
				name={id}
				class="input"
				class:is-warning={!!use && !!err}
				type="text"
				{...validator.constraints}
				use:use
			/>
		{:else}
			<input {id} name={id} class="input" type="text" readonly />
		{/if}
		<Icon icon={use ? mdiPencil : mdiCancel} size="small" iconClassname="is-left" />
	</Control>
	{#if use && err}
		<Help color="danger">{err}</Help>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
</style>
