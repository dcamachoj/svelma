<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import type { FormError, FormField } from '$lib/utils/form-field.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import { mdiCancel, mdiPencil } from '@mdi/js';
	import Field from './Field.svelte';

	export let i18n: I18n;
	export let field: FormField;
	export let value: string | number;
	export let readonly: boolean = false;
	export let error: FormError | undefined = undefined;

	let err: string = '';

	$: id = field.id;
	$: label = field.labelText(i18n);
	$: err = error ? i18n.str(error.message, error.params) : '';
</script>

<Field let:Control let:Label let:Help>
	<Label {id}>{label}</Label>
	<Control iconsLeft>
		<input
			class="input"
			class:is-warning={!!err}
			readonly={readonly || undefined}
			{value}
			{...field.inputProps}
		/>
		<Icon icon={readonly ? mdiCancel : mdiPencil} size="small" iconClass="is-left" />
	</Control>
	{#if err}
		<Help color="danger">{err}</Help>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
</style>
