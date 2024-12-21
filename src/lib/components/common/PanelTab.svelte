<script lang="ts">
	import { bulmaClassnames } from '$lib/utils/bulma.js';
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import IconText from './IconText.svelte';

	export let opts: BulmaOptions = {};
	export let active: boolean;
	export let href: string = '/';
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;

	$: cls = bulmaClassnames(opts);
</script>

<a {href} class={cls} class:is-active={active} on:click>
	<slot>
		<IconText {icon} {text} />
	</slot>
</a>
