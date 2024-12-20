<script lang="ts">
	import type { Option } from '$lib/utils/bulma.types.js';
	import type { FormError, FormField } from '$lib/utils/form-field.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import { mdiAlert, mdiCancel, mdiPencil } from '@mdi/js';
	import Icon from '../common/Icon.svelte';
	import Field from './Field.svelte';
	import { select, selectWrapper } from './input.js';
	import IconText from '../common/IconText.svelte';

	export let i18n: I18n;
	export let field: FormField;
	export let value: string | number;
	export let options: Option[];
	export let readonly: boolean = false;
	export let error: FormError | undefined = undefined;

	$: id = field.id;
	$: label = field.labelText(i18n);
	$: err = error ? i18n.str(error.message, error.params) : '';
	$: clsWrapper = selectWrapper.cls({ fullwidth: true, color: err ? 'warning' : undefined });
	$: clsSelect = select.cls({});
</script>

<Field let:Control let:Label let:Help>
	<Label {id}>{label}</Label>
	{#if readonly}
		<Control iconsLeft>
			<input {id} name={id} class="input" type="text" placeholder={label} readonly />
			<Icon icon={mdiCancel} size="small" iconClass="is-left" />
		</Control>
	{:else}
		<Control iconsLeft expanded>
			<div class={clsWrapper} class:is-warning={!!err}>
				<select class={clsSelect} {value} {...field.inputProps}>
					{#each options as option (option.value)}
						<option value={option.value}>
							<IconText icon={option.icon} text={option.text} />
						</option>
					{/each}
				</select>
			</div>
			<Icon icon={err ? mdiAlert : mdiPencil} size="small" iconClass="is-left" />
		</Control>
	{/if}

	{#if err}
		<Help color="danger">{err}</Help>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
</style>
