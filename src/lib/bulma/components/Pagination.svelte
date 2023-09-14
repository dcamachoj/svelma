<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type {
		BulmaHelper,
		PaginationPage,
		PaginationAlign,
		ContentSize
	} from '$lib/utils/bulma.js';
	import IconText from '$lib/bulma/common/IconText.svelte';
	import PaginationLink from '$lib/bulma/components/PaginationLink.svelte';

	const dispatch = createEventDispatcher();

	export let bulma: BulmaHelper = {};
	export let pages: number[];
	export let prevIcon: string | undefined = undefined;
	export let prevText: string | undefined = undefined;
	export let prevPages: number[] = [];
	export let nextIcon: string | undefined = undefined;
	export let nextText: string | undefined = undefined;
	export let nextPages: number[] = [];
	export let current: number | undefined = undefined;
	export let align: PaginationAlign = 'left';
	export let isRounded: boolean = false;
	export let size: ContentSize | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'pagination',
		{
			[`is-${align}`]: align != 'left',
			'is-rounded': isRounded,
			[`is-${size}`]: size != undefined
		}
	]);

	function onPage(page: PaginationPage) {
		return () => {
			dispatch('page', page);
		};
	}
	function onLink(e: CustomEvent<number>) {
		dispatch('page', e.details);
	}
</script>

<nav class={cls} aria-label="pagination">
	{#if prevIcon || prevText}
		<a href="/" class="pagination-previous" on:click|preventDefault={onPage('prev')}>
			<IconText icon={prevIcon} text={prevText} />
		</a>
	{/if}
	{#if nextIcon || nextText}
		<a href="/" class="pagination-next" on:click|preventDefault={onPage('prev')}>
			<IconText icon={nextIcon} text={nextText} />
		</a>
	{/if}
	<ul class="pagination-list">
		{#if prevPages.length}
			{#each prevPages as page}
				<PaginationLink {page} on:page={onLink} />
			{/each}
			<li>
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
		{/if}
		{#each pages as page}
			<PaginationLink {page} isCurrent={page === current} on:page={onLink} />
		{/each}
		{#if nextPages.length}
			<li>
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			{#each nextPages as page}
				<PaginationLink {page} on:page={onLink} />
			{/each}
		{/if}
	</ul>
</nav>
