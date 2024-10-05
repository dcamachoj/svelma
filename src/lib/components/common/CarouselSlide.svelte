<script lang="ts">
	import { fade, fly, slide } from 'svelte/transition';

	export let size: { w: number; h: number };
	export let duration: number;
	export let active: boolean;
	export let dirLeft: boolean;

	$: style = `width: ${size.w}px; height: ${size.h}px;`;
	$: factorT = dirLeft ? 1 : -1;
	$: factorU = -factorT;
</script>

{#if active}
	<div
		class="carousel-slide"
		{style}
		in:fly={{ x: factorU * size.w, duration }}
		out:fly={{ x: factorT * size.w, duration }}
	>
		<slot />
	</div>
{/if}

<style>
	.carousel-slide {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
</style>
