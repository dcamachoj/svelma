<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarItem } from './navbar.js';

	export let opts: BulmaOptions = {};
	export let expanded: boolean = false;
	export let tab: boolean = false;
	export let active: boolean = false;
	export let href: string;
	export let title: string = '';
	export let preventDefault: boolean = true;
	export let preloadData: 'tap' | 'hover' | undefined = undefined;

	$: cls = navbarItem.cls({ opts, expanded, tab, active });
</script>

{#if preventDefault}
	<a class={cls} {href} {title} data-sveltekit-preload-data={preloadData} on:click|preventDefault>
		<slot />
	</a>
{:else}
	<a class={cls} {href} {title} data-sveltekit-preload-data={preloadData}>
		<slot />
	</a>
{/if}
