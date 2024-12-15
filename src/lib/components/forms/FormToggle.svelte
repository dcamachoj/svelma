<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import type { FormError, FormField } from '$lib/utils/form-field.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import { mdiCancel, mdiPencil } from '@mdi/js';
	import Field from './Field.svelte';

	export let i18n: I18n;
	export let field: FormField;
	export let checked: boolean;
	export let readonly: boolean = false;
	export let error: FormError | undefined = undefined;

	let err: string = '';

	$: id = field.id;
	$: label = field.labelText(i18n);
	$: err = error ? i18n.str(error.message, error.params) : '';
	$: cls = toggle.cls({});
	$: clsSlider = toggleSlider.cls({ rounded });
	$: clsContent = toggleContent.cls({});
</script>

<Field let:Help>
	<label class={cls} for={id}>
		{#if readonly}
			<input {id} name={id} class="input" type="checkbox" placeholder={label} disabled {checked} />
		{:else}
			<input type="checkbox" placeholder={label} {checked} {...field.inputProps} />
		{/if}
		<span class={clsSlider}></span>
		<span class={clsContent}>{label}</span>
	</label>
	{#if err}
		<Help color="danger">{err}</Help>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
</style>
