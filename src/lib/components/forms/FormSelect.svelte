<script lang="ts">
	import type { Option } from '$lib/utils/bulma.types.js';
	import type { FormError, FormField } from '$lib/utils/form-field.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import { mdiAlert, mdiCancel, mdiPencil } from '@mdi/js';
	import Icon from '../common/Icon.svelte';
	import Field from './Field.svelte';
	import { selectClass, selectWrapperClass } from './input.js';
	import IconText from '../common/IconText.svelte';

	export let i18n: I18n;
	export let field: FormField;
	export let value: string | number;
	export let options: Option[];
	export let readonly: boolean = false;
	export let error: FormError | undefined = undefined;
	export let prefix: string = '';

	$: id = field.id;
	$: label = field.labelText(i18n, prefix);
	$: err = error ? i18n.s(error.message, error.params) : '';
	$: clsWrapper = selectWrapperClass.cls({ fullwidth: true, color: err ? 'warning' : undefined });
	$: clsSelect = selectClass.cls({});
</script>

<Field let:Control let:Label let:Help>
	<Label {id}>{label}</Label>
	{#if readonly}
		<Control iconsLeft>
			<input {id} name={id} class="input" type="text" placeholder={label} readonly />
			<Icon icon={mdiCancel} size="small" iconClassname="is-left" />
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
			<Icon icon={err ? mdiAlert : mdiPencil} size="small" iconClassname="is-left" />
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
