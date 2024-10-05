<script lang="ts">
	import Panel from '$lib/components/common/Panel.svelte';
	import { createEventDispatcher } from 'svelte';
	import Search from './Search.svelte';
	import Overflow from './Overflow.svelte';
	import type { MenuAction } from '$lib/utils/stores.js';
	import type { Option } from '$lib/utils/bulma.types.js';
	import { panelBlock } from '../common/panel.js';

	const dispatch = createEventDispatcher();
	type ItemHref = (item: any) => string;

	export let items: any[] = [];
	export let itemClick: boolean = false;
	export let itemHref: ItemHref | undefined = undefined;
	export let actions: MenuAction[] = [];
	export let value: string | number = '';
	export let options: Option[] = [];

	$: clsPanelBlock = panelBlock.cls({});

	function onItemClick(item: any) {
		return () => {
			dispatch('item-click', item);
		};
	}
</script>

<Overflow>
	<svelte:fragment slot="static">
		<slot name="before" />
		<Search bind:selected={value} {options} {actions} on:search />
		<slot name="after" />
	</svelte:fragment>
	<Panel let:PanelBlock>
		{#each items as item}
			{#if itemClick}
				<a href="/" class={clsPanelBlock} on:click={onItemClick(item)}>
					<slot {item} />
				</a>
			{:else if itemHref}
				<a class={clsPanelBlock} href={itemHref(item)}>
					<slot {item} />
				</a>
			{:else}
				<PanelBlock>
					<slot {item} />
				</PanelBlock>
			{/if}
		{/each}
	</Panel>
</Overflow>
