<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { debounce } from '$lib/utils/debounce.js';
	import type { MenuAction } from '$lib/utils/stores.js';
	import MenuActionButton from '../common/MenuActionButton.svelte';
	import type { Option } from '$lib/utils/bulma.types.js';
	import Icon from '$lib/components/common/Icon.svelte';
	import { mdiMagnify } from '@mdi/js';
	import { control, field } from '../forms/misc.js';
	import { select, selectWrapper } from '../forms/input.js';

	const dispatch = createEventDispatcher();

	export let wait: number = 200;
	export let actions: MenuAction[] = [];
	export let iconLeft: string = mdiMagnify;
	export let selected: string | number = '';
	export let options: Option[] = [];

	let elInput: HTMLInputElement;

	function onSearch(e: KeyboardEvent) {
		dispatch('search', elInput.value);
	}
	const onSearchClick = debounce(onSearch, wait);
</script>

<div class={field.cls({ addons: actions.length > 0 || options.length > 0 })}>
	<div class={control.cls({ iconsLeft: !!iconLeft, expanded: true })}>
		<input
			id="search"
			type="search"
			class="input"
			bind:this={elInput}
			value=""
			on:keyup={onSearchClick}
		/>
		<Icon icon={iconLeft} size="small" align="left" />
	</div>
	{#each actions as action}
		<div class="control">
			<MenuActionButton {action} />
		</div>
	{/each}
	{#if options.length}
		<div class="control">
			<div class={selectWrapper.cls({})}>
				<select class={select.cls({})} id="search" name="search" bind:value={selected} on:change>
					{#each options as option}
						<option value={option.value}>{option.text}</option>
					{/each}
				</select>
			</div>
		</div>
	{/if}
</div>
