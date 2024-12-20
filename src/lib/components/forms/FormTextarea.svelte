<script lang="ts">
	import type { FormError, FormField } from '$lib/utils/form-field.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import Field from './Field.svelte';

	export let i18n: I18n;
	export let field: FormField;
	export let value: string | number;
	export let readonly: boolean | undefined = undefined;
	export let error: FormError | undefined = undefined;

	type $$Props = Partial<HTMLTextAreaElement> & {
		i18n: I18n;
		field: FormField;
		value: string | number;
		readonly?: boolean;
		error?: FormError;
	};

	let err: string = '';

	$: id = field.id;
	$: label = field.labelText(i18n);
	$: err = error ? i18n.str(error.message, error.params) : '';
</script>

<Field let:Control let:Label let:Help>
	<Label {id}>{label}</Label>
	<Control iconsLeft>
		<textarea
			class="textarea"
			class:is-warning={!!err}
			readonly={readonly || undefined}
			{value}
			{...field.inputProps}
			{...$$restProps}
		/>
	</Control>
	{#if err}
		<Help color="danger">{err}</Help>
	{/if}
</Field>

<style>
	textarea[readonly] {
		cursor: not-allowed;
	}
</style>
