<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors, InputSize, Option } from '$lib/utils/bulma.js';
	import { classNames } from '$lib/utils/classnames.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let bulma: BulmaHelper = {};
	export let id: string;
	export let options: Option[];
	export let value: string | Number;
	export let color: Colors | undefined = undefined;
	export let size: InputSize | undefined = undefined;
	export let disabled: boolean = false;
	export let isMultiple: boolean = false;
	export let isRounded: boolean = false;
	export let isHovered: boolean = false;
	export let isFocused: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'select',
		{
			'is-multiple': isMultiple,
			[`is-${color}`]: color != undefined,
			[`is-${size}`]: size != undefined,
			'is-rounded': isRounded
		}
	]);
	$: clsSelect = classNames({
		'is-hovered': isHovered,
		'is-focused': isFocused
	});

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = target.value;
		dispatch('value-changed', { name: id, value });
	};
</script>

<div class={cls}>
	<select
		{id}
		name={id}
		class={clsSelect}
		{value}
		multiple={isMultiple}
		{disabled}
		on:change={handleInput}
	>
		{#each options as option}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>
</div>
