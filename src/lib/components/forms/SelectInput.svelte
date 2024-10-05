<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import type { FieldValidator, UseInput, UseSelect } from '$lib/utils/validation.js';
	import { mdiCancel, mdiPencil } from '@mdi/js';
	import Field from './Field.svelte';
	import { select, selectWrapper } from './input.js';
	import type { Option } from '$lib/utils/bulma.types.js';
	import IconText from '../common/IconText.svelte';

	export let id: string;
	export let validator: FieldValidator;
	export let use: UseSelect | undefined = undefined;
	export let options: Option[];
	export let label: string = '';
	export let error: string = '';

	$: clsWrapper = selectWrapper.cls({ fullwidth: true });
	$: clsSelect = select.cls({});
</script>

<Field let:Control let:Label let:Help>
	<Label {id}>{label || validator.title}</Label>
	{#if !use}
		<Control iconLeft>
			<input {id} name={id} class="input" type="text" placeholder={validator.title} readonly />
			<Icon icon={mdiCancel} size="small" iconClass="is-left" />
		</Control>
	{:else}
		<Control iconLeft expanded>
			<div class={clsWrapper}>
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

	{#if error}
		<Help color="danger">{error}</Help>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
</style>
