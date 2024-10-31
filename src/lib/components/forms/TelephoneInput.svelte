<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import type { Option } from '$lib/utils/bulma.types.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import type { FieldValidator, UseInput, UseSelect } from '$lib/utils/validation.js';
	import { mdiCancel, mdiPencil } from '@mdi/js';
	import type { Writable } from 'svelte/store';
	import { countryCodeOptions, countryCodes } from './country-codes.js';
	import Field from './Field.svelte';
	import { input, select, selectWrapper } from './input.js';

	export let validatorPrefix: FieldValidator;
	export let validatorNumber: FieldValidator;
	export let errorPrefix: Writable<string> | undefined = undefined;
	export let errorNumber: Writable<string> | undefined = undefined;
	export let i18n: I18n;
	export let usePrefix: UseSelect | undefined = undefined;
	export let useNumber: UseInput | undefined = undefined;

	$: idPrefix = validatorPrefix.field;
	$: idNumber = validatorNumber.field;
	$: label = validatorNumber.label(i18n);
	$: err =
		errorPrefix && $errorPrefix
			? i18n.str($errorPrefix)
			: errorNumber && $errorNumber
				? i18n.str($errorNumber)
				: '';
	$: clsWrapper = selectWrapper.cls({ fullwidth: true });
	$: clsSelect = select.cls({});
	$: clsInput = input.cls({});
	$: readonly = !usePrefix && !useNumber;
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
				placeholder={validatorPrefix.label(i18n)}
				readonly
			/>
			<Icon icon={mdiCancel} size="small" iconClass="is-left" />
		</Control>
		<Control expanded>
			<input id={idNumber} name={idNumber} class="input" type="text" placeholder={label} readonly />
		</Control>
	{:else if usePrefix && useNumber}
		<Control iconsLeft>
			<div class={clsWrapper}>
				<select
					id={idPrefix}
					name={idPrefix}
					class={clsSelect}
					{...validatorPrefix.constraints}
					use:usePrefix
				>
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
				id={idNumber}
				name={idNumber}
				class={clsInput}
				class:is-warning={!readonly && !!err}
				{...validatorNumber.constraints}
				use:useNumber
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
