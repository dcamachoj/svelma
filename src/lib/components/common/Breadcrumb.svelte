<script lang="ts">
	import { bulmaClassnames } from '$lib/utils/bulma.js';
	import type {
		Action,
		BreadcrumbSeparator,
		BulmaOptions,
		ContentSize
	} from '$lib/utils/bulma.types.js';
	import IconText from './IconText.svelte';
	import { breadcrumb } from './misc.js';

	export let opts: BulmaOptions = {};
	export let items: Action[];
	export let active: string | undefined = undefined;
	export let centered: boolean = false;
	export let right: boolean = false;
	export let separator: BreadcrumbSeparator | undefined = undefined;
	export let size: ContentSize | undefined = undefined;

	$: cls = breadcrumb.cls({ opts, centered, right, separator, size });
</script>

<nav class={cls} aria-label="breadcrumbs">
	<ul>
		{#each items as item (item.name)}
			<li class:is-active={active == item.name}>
				{#if item.href}
					<a href={item.href}> <IconText icon={item.icon} text={item.text} /></a>
				{:else if item.click}
					<a href="/" on:click|preventDefault={item.click}>
						<IconText icon={item.icon} text={item.text} />
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
