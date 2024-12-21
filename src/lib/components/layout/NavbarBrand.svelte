<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { createEventDispatcher } from 'svelte';
	import { navbarBrandClass } from './navbar.js';
	import NavbarItem from './NavbarItem.svelte';

	const dispatch = createEventDispatcher();

	export let opts: BulmaOptions = {};
	export let homeUrl: string;
	export let logoUrl: string | undefined = undefined;
	export let logoWidth: number;
	export let logoHeight: number;
	export let dataTarget: string | undefined = undefined;
	export let active: boolean = false;

	$: cls = navbarBrandClass.cls({ opts });

	function onMenuToggle() {
		active = !active;
		if (active) {
			dispatch('menu-opened');
		} else {
			dispatch('menu-closed');
		}
		dispatch('menu-active-changed', active);
	}
</script>

<div class={cls}>
	<NavbarItem href={homeUrl}>
		{#if logoUrl}
			<img src={logoUrl} alt="logo" width={logoWidth} height={logoHeight} />
		{:else}
			<div class="logo" style="width: {logoWidth}px; height: {logoHeight}px;"></div>
		{/if}
		<slot />
	</NavbarItem>
	{#if dataTarget}
		<a
			href="/"
			role="button"
			class="navbar-burger"
			class:is-active={active}
			aria-label="menu"
			aria-expanded="false"
			data-target={dataTarget}
			on:click|preventDefault={onMenuToggle}
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</a>
	{/if}
</div>
