<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import CarouselSlide from './CarouselSlide.svelte';
	import Icon from '$lib/components/common/Icon.svelte';
	import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

	export let duration: number = 1000;
	export let period: number;
	export let count: number;

	let currentIndex: number = 0;
	let timeoutHandle: number;
	let elCarousel: HTMLDivElement;
	let dirLeft: boolean = true;

	$: elWidth = elCarousel?.clientWidth;
	$: elHeight = elCarousel?.clientHeight;
	$: size = { w: elWidth, h: elHeight };

	onMount(() => {
		onSlide(0);
		onTimeout();
	});
	onDestroy(() => {
		onClearTimeout();
	});

	function onSlide(delta: number) {
		dirLeft = delta > 0;
		currentIndex = (currentIndex + delta + count) % count;
	}
	function onNext() {
		onSlide(1);
		onTimeout();
	}
	function onPrev() {
		onSlide(-1);
		onTimeout();
	}
	function onClearTimeout() {
		if (timeoutHandle) clearTimeout(timeoutHandle);
	}
	function onTimeout() {
		if (period) {
			onClearTimeout();
			timeoutHandle = setTimeout(onNext, period);
		}
	}
</script>

<div class="carousel" bind:this={elCarousel}>
	{#if elWidth && elHeight}
		<slot {currentIndex} {duration} Slide={CarouselSlide} {size} {dirLeft} />
	{/if}
	<a href="/" class="link prev" on:click|preventDefault={onPrev}>
		<Icon icon={mdiChevronLeft} />
	</a>
	<a href="/" class="link next" on:click|preventDefault={onNext}>
		<Icon icon={mdiChevronRight} />
	</a>
</div>

<style lang="less">
	.carousel {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.link {
		border-radius: 50%;
		background: rgba(128, 128, 128, 0.5);
		color: white;
		padding: 1rem;
		position: absolute;
		top: calc(50% - 3rem);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.prev {
		left: 0;
	}
	.next {
		right: 0;
	}
	@media screen and (max-width: 768px) {
		.prev,
		.next {
			top: 0;
		}
	}
</style>
