<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors, InputSize } from '$lib/utils/bulma.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let bulma: BulmaHelper = {};
	export let id: string;
	export let rows: number | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let disabled: boolean = false;
	export let value: string | Number;
	export let color: Colors | undefined = undefined;
	export let size: InputSize | undefined = undefined;
	export let isRounded: boolean = false;
	export let isHovered: boolean = false;
	export let isFocused: boolean = false;
	export let isStatic: boolean = false;
	export let readonly: boolean | undefined = undefined;
	export let hasFixedSize: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'input',
		{
			[`is-${color}`]: color != undefined,
			[`is-${size}`]: size != undefined,
			'is-rounded': isRounded,
			'is-hovered': isHovered,
			'is-focused': isFocused,
			'is-static': isStatic,
			'has-fixed-size': hasFixedSize
		}
	]);

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = target.value;
		dispatch('value-changed', { name: id, value });
	};
</script>

<textarea
	{id}
	name={id}
	class={cls}
	{value}
	{placeholder}
	{readonly}
	{disabled}
	{rows}
	on:input={handleInput}
/>
