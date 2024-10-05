<script lang="ts">
	import type { BulmaOptions, ContentSize, PaginationAlign } from '$lib/utils/bulma.types.js';
	import { pagination } from './pagination.js';
	import PaginationEllipsis from './PaginationEllipsis.svelte';
	import PaginationLink from './PaginationLink.svelte';
	import PaginationList from './PaginationList.svelte';
	import PaginationNext from './PaginationNext.svelte';
	import PaginationPrev from './PaginationPrev.svelte';

	export let opts: BulmaOptions = {};
	export let align: PaginationAlign = 'left';
	export let rounded: boolean = false;
	export let size: ContentSize | undefined = undefined;

	$: cls = pagination.cls({ opts, align, rounded, size });
</script>

<nav class={cls} aria-label="pagination">
	<slot {PaginationLink} {PaginationPrev} {PaginationNext} {PaginationList} {PaginationEllipsis} />
</nav>
