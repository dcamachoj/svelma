<script lang="ts">
	import Button from '$lib/components/common/Button.svelte';
	import IconText from '$lib/components/common/IconText.svelte';
	import type { MenuAction } from '$lib/utils/stores.js';

	export let action: MenuAction;

	$: size = action.size;
	$: title = action.title;
</script>

{#if action.href}
	<Button href={action.href} color={action.color} {size} {title}>
		<IconText icon={action.icon} text={action.text} />
	</Button>
{:else if action.click}
	<Button color={action.color} on:click={action.click} {size} {title}>
		<IconText icon={action.icon} text={action.text} />
	</Button>
{/if}
