<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';

	import Icon from './Icon.svelte';

	export let className: app.ClsArgument = '';
	export let helper: bulma.Helper = {};
	export let href: string = '';
	export let icon: string = '';
	export let text: string = '';
	export let color:
		| 'white'
		| 'light'
		| 'dark'
		| 'black'
		| 'text'
		| 'ghost'
		| 'primary'
		| 'link'
		| 'info'
		| 'success'
		| 'warning'
		| 'danger'
		| null = null;
	export let light: boolean = false;
	export let size: 'small' | 'normal' | 'medium' | 'large' | null = null;
	export let responsive: boolean = false;
	export let fullWidth: boolean = false;
	export let outlined: boolean = false;
	export let inverted: boolean = false;
	export let rounded: boolean = false;
	export let loading: boolean = false;
	export let isStatic: boolean = false;
	export let disabled: boolean | undefined = undefined;

	$: cls = bulmaHelper(helper, [
		'button',
		className,
		{
			[`is-${color}`]: color,
			'is-light': light,
			[`is-${size}`]: size,
			'is-responsive': responsive,
			'is-fullwidth': fullWidth,
			'is-outlined': outlined,
			'is-inverted': inverted,
			'is-rounded': rounded,
			'is-loading': loading,
			'is-static': isStatic
		}
	]);

	$: props = {
		disabled: disabled || undefined
	};
</script>

{#if href}
	<a {href} class={cls} {...props}>
		{#if icon}
			<Icon {icon} className={{ 'pr-1': text }} />
		{/if}
		{#if text}
			<span>{text}</span>
		{/if}
		<slot />
	</a>
{:else}
	<buttton role="button" tabindex="-1" on:click class={cls} {...props}>
		{#if icon}
			<Icon {icon} className={{ 'pr-1': text }} />
		{/if}
		{#if text}
			<span>{text}</span>
		{/if}
		<slot />
	</buttton>
{/if}
