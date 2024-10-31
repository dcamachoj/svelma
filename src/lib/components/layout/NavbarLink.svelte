<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import type { I18n } from '$lib/utils/i18n.js';
	import Icon from '../common/Icon.svelte';
	import { navbarLink } from './navbar.js';

	export let opts: BulmaOptions = {};
	export let arrowless: boolean = false;
	export let href: string | undefined = undefined;
	export let icon: string = '';
	export let text: string = '';
	export let i18n: I18n | undefined = undefined;

	$: cls = navbarLink.cls({ opts, arrowless });
</script>

{#if href}
	<a {href} class={cls}>
		<slot>
			{#if icon}
				<Icon {icon} />
			{/if}
			{#if text}
				<span>{i18n ? i18n.str(text) : text}</span>
			{/if}
		</slot>
	</a>
{:else}
	<a href="/" class={cls} on:click|preventDefault>
		<slot>
			{#if icon}
				<Icon {icon} />
			{/if}
			{#if text}
				<span>{i18n ? i18n.str(text) : text}</span>
			{/if}
		</slot>
	</a>
{/if}
