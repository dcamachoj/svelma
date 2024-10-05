<script lang="ts">
	import type { BulmaOptions, BwColors, Colors } from '$lib/utils/bulma.types.js';
	import { navbar } from './navbar.js';
	import NavbarBrand from './NavbarBrand.svelte';
	import NavbarDivider from './NavbarDivider.svelte';
	import NavbarDropdown from './NavbarDropdown.svelte';
	import NavbarEnd from './NavbarEnd.svelte';
	import NavbarItem from './NavbarItem.svelte';
	import NavbarLink from './NavbarLink.svelte';
	import NavbarMenu from './NavbarMenu.svelte';
	import NavbarStart from './NavbarStart.svelte';

	export let opts: BulmaOptions = {};
	export let color: Colors | BwColors | undefined = undefined;
	export let fixed: 'top' | 'bottom' | undefined = undefined;
	export let transparent: boolean = false;
	export let spaced: boolean = false;
	export let shadow: boolean = false;
	export let test: boolean = false;

	$: cls = navbar.cls({ opts, color, fixed, transparent, spaced, shadow, test });
</script>

<nav class={cls} aria-label="main navigation">
	<slot
		{NavbarItem}
		{NavbarBrand}
		{NavbarDivider}
		{NavbarLink}
		{NavbarDropdown}
		{NavbarStart}
		{NavbarEnd}
		{NavbarMenu}
	/>
</nav>
