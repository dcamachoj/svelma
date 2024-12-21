<script lang="ts">
	import type { FormError, FormField } from '$lib/utils/form-field.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import Field from './Field.svelte';
	import { toggleClass, toggleContentClass, toggleSliderClass } from './input.js';

	export let i18n: I18n;
	export let field: FormField;
	export let checked: boolean;
	export let readonly: boolean = false;
	export let rounded: boolean = false;
	export let error: FormError | undefined = undefined;

	let err: string = '';

	$: id = field.id;
	$: label = field.labelText(i18n);
	$: err = error ? i18n.str(error.message, error.params) : '';
	$: cls = toggleClass.cls({});
	$: clsSlider = toggleSliderClass.cls({ rounded });
	$: clsContent = toggleContentClass.cls({});
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
