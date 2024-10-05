<script lang="ts">
	import { bulmaClassnames } from '$lib//utils/bulma.js';
	import type { BulmaOptions, ButtonColor, ButtonSize } from '$lib//utils/bulma.types.js';
	import type { ClsArgument } from '$lib//utils/classnames.js';
	import { button } from './button.js';
	import IconText from './IconText.svelte';

	type HTMLAttributeAnchorTarget = '_self' | '_blank' | '_parent' | '_top' | (string & {});

	export let opts: BulmaOptions = {};
	export let type: 'button' | 'submit' = 'button';
	export let href: string = '';
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
	export let disabled: boolean | undefined = undefined;
	export let target: HTMLAttributeAnchorTarget | undefined | null = undefined;
	export let title: string | undefined = undefined;

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

	$: props = {
		disabled: disabled || undefined,
		title,
	};
</script>

{#if href}
	<a {href} class={cls} class:is-not-centered={notCentered} {target} {...props}>
		<IconText {icon} {text} />
		<slot />
	</a>
{:else if type == 'submit'}
	<button type="submit" tabindex="-1" class={cls} class:is-not-centered={notCentered} {...props}>
		<IconText {icon} {text} />
		<slot />
	</button>
{:else}
	<button
		type="button"
		tabindex="-1"
		on:click
		class={cls}
		class:is-not-centered={notCentered}
		{...props}
	>
		<IconText {icon} {text} />
		<slot />
	</button>
{/if}

<style>
	.is-not-centered {
		display: flex;
		flex-direction: row;
		justify-content: start;
	}
</style>
