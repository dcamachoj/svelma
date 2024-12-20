<script lang="ts">
	import { EnvPublic } from '$lib/utils/env.js';
	import { onMount } from 'svelte';

	const env = EnvPublic.getInstance();

	export let offset: string = '';

	let headerHeight = 0;
	let headerEl: HTMLDivElement;

	$: styleCalc = [
		'100vh',
		`${env.mainHeaderHeight}px`,
		`${env.mainFooterHeight}px`,
		'1rem',
		offset,
		headerHeight ? `${headerHeight}px` : '',
	].filter(Boolean);
	$: style = `max-height: calc(${styleCalc.join(' - ')});`;

	onMount(() => {
		headerHeight = headerEl?.clientHeight;
	});
</script>

<div class="overflow-container">
	<div class="header" bind:this={headerEl}><slot name="header" /></div>
	<div class="overflow" {style}><slot /></div>
</div>

<style lang="less">
	.overflow-container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.header {
			display: flex;
			flex-direction: column;
			align-items: stretch;

			& :global(> *) {
				width: 100%;
			}
		}
		.overflow {
			overflow-y: auto;
		}
	}
</style>
