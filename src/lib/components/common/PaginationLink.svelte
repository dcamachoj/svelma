<script lang="ts">
	import type { BulmaOptions, PaginationPage } from '$lib/utils/bulma.types.js';
	import { createEventDispatcher } from 'svelte';
	import { paginationLink } from './pagination.js';

	const dispatch = createEventDispatcher();

	export let opts: BulmaOptions = {};
	export let current: boolean = false;
	export let page: PaginationPage;
	export let href: string = '/';
	export let label: string = 'Página #';

	$: cls = paginationLink.cls({ opts, current });
	$: ariaLabel = label.replace('#', page.toString());

	function onPage() {
		dispatch('page', page);
	}
</script>

<li>
	<a {href} class={cls} aria-label={ariaLabel} on:click|preventDefault={onPage}>
		<slot>{page}</slot>
	</a>
</li>
