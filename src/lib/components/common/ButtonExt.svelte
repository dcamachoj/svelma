<script lang="ts">
	import IconText from './IconText.svelte';

	import { button } from './button.js';

	import type { BulmaOptions, ButtonColor, ButtonSize } from '$lib/utils/bulma.types.js';

	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Element = $$Generic<'button' | 'a'>;

	interface ButtonComponentElements {
		button: HTMLButtonAttributes;
		a: HTMLAnchorAttributes;
	}

	type $$Props = ButtonComponentElements[Element] & {
		element: Element;
		className?: string;
		opts?: BulmaOptions;
		icon?: string;
		text?: string;
		color?: ButtonColor;
		light?: boolean;
		size?: ButtonSize;
		responsive?: boolean;
		fullwidth?: boolean;
		outlined?: boolean;
		inverted?: boolean;
		rounded?: boolean;
		loading?: boolean;
		isStatic?: boolean;
		notCentered?: boolean;
	};

	export let opts: BulmaOptions = {};
	export let element: Element;
	export let className: string | undefined = undefined;
	export let icon: string = '';
	export let text: string = '';
	export let color: ButtonColor | undefined = undefined;
	export let light: boolean = false;
	export let size: ButtonSize | undefined = undefined;
	export let responsive: boolean = false;
	export let fullwidth: boolean = false;
	export let outlined: boolean = false;
	export let inverted: boolean = false;
	export let rounded: boolean = false;
	export let loading: boolean = false;
	export let isStatic: boolean = false;
	export let notCentered: boolean = false;

	let node: HTMLAnchorElement | HTMLButtonElement;

	$: cls = button.cls({
		opts,
		color,
		light,
		size,
		responsive,
		fullwidth,
		outlined,
		inverted,
		rounded,
		loading,
		isStatic,
	});

	export function focus() {
		node.focus();
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={element}
	bind:this={node}
	class="{cls} {className || ''}"
	class:is-not-centered={notCentered}
	on:click
	{...$$restProps}
>
	<IconText {icon} {text} />
	<slot />
</svelte:element>

<style>
	.is-not-centered {
		display: flex;
		flex-direction: row;
		justify-content: start;
	}
</style>
