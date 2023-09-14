<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors, InputSize } from '$lib/utils/bulma.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let bulma: BulmaHelper = {};
	export let id: string;
	export let placeholder: string | undefined = undefined;
	export let type: 'text' | 'password' | 'email' | 'tel' | 'number' = 'text';
	export let value: string | Number;
	export let color: Colors | undefined = undefined;
	export let size: InputSize | undefined = undefined;
	export let isRounded: boolean = false;
	export let isHovered: boolean = false;
	export let isFocused: boolean = false;
	export let isStatic: boolean = false;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'input',
		{
			[`is-${color}`]: color != undefined,
			[`is-${size}`]: size != undefined,
			'is-rounded': isRounded,
			'is-hovered': isHovered,
			'is-focused': isFocused,
			'is-static': isStatic
		}
	]);

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = type === 'number' ? +target.value : target.value;
		dispatch('value-changed', { name: id, value });
	};
</script>

<input
	{id}
	name={id}
	{type}
	class={cls}
	{value}
	{placeholder}
	{disabled}
	{readonly}
	on:input={handleInput}
/>
