<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import type { FieldValidator, UseInput, UseSelect } from '$lib/utils/validation.js';
	import { mdiCancel, mdiPencil } from '@mdi/js';
	import Field from './Field.svelte';
	import { select, selectWrapper } from './input.js';
	import type { Option } from '$lib/utils/bulma.types.js';
	import IconText from '../common/IconText.svelte';
	import type { Writable } from 'svelte/store';
	import type { I18n } from '$lib/utils/i18n.js';

	export let validator: FieldValidator;
	export let error: Writable<string> | undefined = undefined;
	export let i18n: I18n;
	export let use: UseSelect | undefined = undefined;
	export let options: Option[];

	$: id = validator.field;
	$: label = validator.label(i18n);
	$: err = error && $error ? i18n.str($error) : '';
	$: clsWrapper = selectWrapper.cls({ fullwidth: true });
	$: clsSelect = select.cls({});
</script>

<Field let:Control let:Label let:Help>
	<Label {id}>{label}</Label>
	{#if !use}
		<Control iconsLeft>
			<input {id} name={id} class="input" type="text" placeholder={label} readonly />
			<Icon icon={mdiCancel} size="small" iconClass="is-left" />
		</Control>
	{:else}
		<Control iconsLeft expanded>
			<div class={clsWrapper} class:is-warning={!!use && !!err}>
				<select {id} name={id} class={clsSelect} {...validator.constraints} use:use>
					{#each options as option (option.value)}
						<option value={option.value}>
							<IconText icon={option.icon} text={option.text} />
						</option>
					{/each}
				</select>
			</div>
			<Icon icon={mdiPencil} size="small" iconClass="is-left" />
		</Control>
	{/if}

	{#if use && err}
		<Help color="danger">{err}</Help>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
</style>
