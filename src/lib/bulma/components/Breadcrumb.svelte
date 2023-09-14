<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Action, BreadcrumbSeparator, ContentSize } from '$lib/utils/bulma.js';
	import IconText from '$lib/bulma/common/IconText.svelte';

	export let bulma: BulmaHelper = {};
	export let items: Action[];
	export let active: string | undefined = undefined;
	export let isCentered: boolean = false;
	export let isRight: boolean = false;
	export let separator: BreadcrumbSeparator | undefined = undefined;
	export let size: ContentSize | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'breadcrumb',
		{
			'is-centered': isCentered,
			'is-right': isRight,
			[`is-${separator}-separator`]: separator != undefined,
			[`is-${size}`]: size != undefined
		}
	]);
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
