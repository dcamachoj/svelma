<script lang="ts">
	import type { FieldValidator, UseInput } from '$lib/utils/validation.js';
	import Field from './Field.svelte';
	import { toggle, toggleContent, toggleSlider } from './input.js';

	export let id: string;
	export let validator: FieldValidator;
	export let use: UseInput | undefined = undefined;
	export let label: string = '';
	export let error: string = '';
	export let rounded: boolean = false;

	$: cls = toggle.cls({});
	$: clsSlider = toggleSlider.cls({ rounded });
	$: clsContent = toggleContent.cls({});
</script>

<Field let:Control let:Help>
	<label class={cls} for={id}>
		{#if !use}
			<input {id} name={id} class="input" type="checkbox" placeholder={validator.title} disabled />
		{:else}
			<input
				{id}
				name={id}
				type="checkbox"
				placeholder={validator.title}
				{...validator.constraints}
				use:use
			/>
		{/if}
		<span class={clsSlider}></span>
		<span class={clsContent}>{label || validator.title}</span>
	</label>
	{#if error}
		<Help color="danger">{error}</Help>
	{/if}
</Field>

<style>
	input[readonly] {
		cursor: not-allowed;
	}
</style>
