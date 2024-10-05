<script lang="ts">
	import { EnvPublic } from '$lib/utils/env.js';
	import { onMount } from 'svelte';

	const env = EnvPublic.getInstance();

	export let offset: string = '';

	let staticHeight = 0;
	let staticEl: HTMLDivElement;

	$: styleCalc = [
		'100vh',
		`${env.mainHeaderHeight}px`,
		`${env.mainFooterHeight}px`,
		'1rem',
		offset,
		staticHeight ? `${staticHeight}px` : '',
	].filter(Boolean);
	$: style = `max-height: calc(${styleCalc.join(' - ')});`;

	onMount(() => {
		staticHeight = staticEl?.clientHeight;
	});
</script>

<div class="overflow-container">
	<div class="static" bind:this={staticEl}><slot name="static" /></div>
	<div class="overflow" {style}><slot /></div>
</div>

<style lang="less">
	.overflow-container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.static {
			display: flex;
			flex-direction: column;
			align-items: stretch;

			& > * {
				width: 100%;
			}
		}
		.overflow {
			overflow-y: auto;
		}
	}
</style>
