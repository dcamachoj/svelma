<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import Icon from '../common/Icon.svelte';
	import { navbarItemClass } from './navbar.js';

	export let opts: BulmaOptions = {};
	export let expanded: boolean = false;
	export let tab: boolean = false;
	export let active: boolean = false;
	export let href: string;
	export let title: string = '';
	export let preventDefault: boolean = false;
	export let preloadData: 'tap' | 'hover' | undefined = undefined;
	export let dropdown: boolean = false;
	export let hoverable: boolean = false;
	export let selected: boolean = false;
	export let icon: string = '';
	export let text: string = '';
	export let i18n: I18n | undefined = undefined;

	$: cls = navbarItemClass.cls({ opts, expanded, tab, active, dropdown, hoverable, selected });
</script>

{#if preventDefault}
	<a class={cls} {href} {title} data-sveltekit-preload-data={preloadData} on:click|preventDefault>
		<slot>
			{#if icon}
				<Icon {icon} />
			{/if}
			<span>&nbsp;</span>
			{#if text}
				<span>{i18n ? i18n.s(text) : text}</span>
			{/if}
		</slot>
	</a>
{:else}
	<a class={cls} {href} {title} data-sveltekit-preload-data={preloadData}>
		<slot>
			{#if icon}
				<Icon {icon} />
			{/if}
			<span>&nbsp;</span>
			{#if text}
				<span>{i18n ? i18n.s(text) : text}</span>
			{/if}
		</slot>
	</a>
{/if}
