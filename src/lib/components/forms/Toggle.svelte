<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { createEventDispatcher } from 'svelte';
	import { toggleClass, toggleContentClass, toggleSliderClass } from './input.js';

	const dispatch = createEventDispatcher();

	export let opts: BulmaOptions = {};
	export let rounded: boolean = false;
	export let id: string | undefined = undefined;
	export let checked: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	$: cls = toggleClass.cls({ opts });
	$: clsSlider = toggleSliderClass.cls({ rounded });
	$: clsContent = toggleContentClass.cls({});

	function onChecked(e: Event) {
		const input = e.target as HTMLInputElement;
		const value = input.checked;
		dispatch('checked', value);
	}
</script>

<label class={cls}>
	<input
		type="checkbox"
		{id}
		name={id}
		{checked}
		disabled={disabled || undefined}
		on:change={onChecked}
	/>
	<span class={clsSlider}></span>
	<span class={clsContent}><slot /></span>
</label>
