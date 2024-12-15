<script lang="ts">
	import { countryCodeOptions } from './country-codes.js';
	import Icon from '$lib/components/common/Icon.svelte';
	import type { FormError, FormField } from '$lib/utils/form-field.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import { mdiCancel, mdiPencil } from '@mdi/js';
	import Field from './Field.svelte';
	import { input, select, selectWrapper } from './input.js';

	export let i18n: I18n;
	export let fieldPrefix: FormField;
	export let fieldNumber: FormField;
	export let valuePrefix: string;
	export let valueNumber: string;
	export let readonly: boolean = false;
	export let errorPrefix: FormError | undefined = undefined;
	export let errorNumber: FormError | undefined = undefined;

	let err: string = '';

	$: idPrefix = fieldPrefix.id;
	$: idNumber = fieldNumber.id;
	$: label = fieldNumber.labelText(i18n);
	$: err = errorPrefix
		? i18n.str(errorPrefix.message, errorPrefix.params)
		: errorNumber
			? i18n.str(errorNumber.message, errorNumber.params)
			: '';
	$: clsWrapper = selectWrapper.cls({ fullwidth: true });
	$: clsSelect = select.cls({});
	$: clsInput = input.cls({});
</script>

<label class="label" for={idNumber}>{label}</label>
<Field let:Control let:Label let:Help addons>
	{#if readonly}
		<Control iconsLeft>
			<input
				id={idPrefix}
				name={idPrefix}
				class="input"
				type="text"
				placeholder={fieldPrefix.labelText(i18n)}
				readonly
				value={valuePrefix}
			/>
			<Icon icon={mdiCancel} size="small" iconClass="is-left" />
		</Control>
		<Control expanded>
			<input
				id={idNumber}
				name={idNumber}
				class="input"
				type="text"
				placeholder={label}
				value={valueNumber}
				readonly
			/>
		</Control>
	{:else}
		<Control iconsLeft>
			<div class={clsWrapper}>
				<select class={clsSelect} value={valuePrefix} {...fieldPrefix.inputProps}>
					{#each countryCodeOptions as option (option.value)}
						<option value={option.value}>
							{option.text}
						</option>
					{/each}
				</select>
			</div>
			<Icon icon={mdiPencil} size="small" iconClass="is-left" />
		</Control>
		<div class="control is-expanded">
			<input
				class={clsInput}
				class:is-warning={!readonly && !!err}
				value={valueNumber}
				{...fieldNumber.inputProps}
			/>
			{#if !readonly && err}
				<p class="help" color="danger">{err}</p>
			{/if}
		</div>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
	.control.is-expanded {
		position: relative;
	}
	.help {
		position: absolute;
		top: 100%;
		left: 0;
	}
</style>
