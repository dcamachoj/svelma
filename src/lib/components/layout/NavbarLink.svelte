<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import IconText from '../common/IconText.svelte';
	import { navbarLink } from './navbar.js';

	export let opts: BulmaOptions = {};
	export let arrowless: boolean = false;
	export let href: string | undefined = undefined;
	export let icon: string = '';
	export let text: string = '';

	$: cls = navbarLink.cls({ opts, arrowless });
</script>

{#if href}
	<a {href} class={cls}>
		<slot>
			<IconText {icon} {text} />
		</slot>
	</a>
{:else}
	<a href="/" class={cls} on:click|preventDefault>
		<slot>
			<IconText {icon} {text} />
		</slot>
	</a>
{/if}
