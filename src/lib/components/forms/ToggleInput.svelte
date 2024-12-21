<script lang="ts">
	import type { FieldValidator, UseInput } from '$lib/utils/validation.js';
	import type { Writable } from 'svelte/store';
	import Field from './Field.svelte';
	import { toggleClass, toggleContentClass, toggleSliderClass } from './input.js';
	import type { I18n } from '$lib/utils/i18n.js';

	export let validator: FieldValidator;
	export let error: Writable<string> | undefined = undefined;
	export let i18n: I18n;
	export let use: UseInput | undefined = undefined;

	export let rounded: boolean = false;

	$: id = validator.field;
	$: label = validator.label(i18n);
	$: err = error && $error ? i18n.str($error) : '';
	$: cls = toggleClass.cls({});
	$: clsSlider = toggleSliderClass.cls({ rounded });
	$: clsContent = toggleContentClass.cls({});
</script>

<Field let:Help>
	<label class={cls} for={id}>
		{#if !use}
			<input {id} name={id} class="input" type="checkbox" placeholder={label} disabled />
		{:else}
			<input
				{id}
				name={id}
				type="checkbox"
				placeholder={label}
				{...validator.constraints}
				use:use
			/>
		{/if}
		<span class={clsSlider}></span>
		<span class={clsContent}>{label}</span>
	</label>
	{#if use && err}
		<Help color="danger">{err}</Help>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
</style>
