<script lang="ts">
	import IconText from './IconText.svelte';
	export let href: string = '';
	export let active: boolean = false;
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;
	export let click: (() => void) | undefined = undefined;
</script>

{#if href}
	<a {href} class:is-active={active}>
		<slot>
			<IconText {icon} {text} />
		</slot>
	</a>
{:else if click}
	<a href="/" on:click|preventDefault={click} class:is-active={active}>
		<slot>
			<IconText {icon} {text} />
		</slot>
	</a>
{/if}
