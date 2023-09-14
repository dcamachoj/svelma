<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	const dispatch = createEventDispatcher();

	export let bulma: BulmaHelper = {};
	export let page: number;
	export let isCurrent: boolean = false;

	$: cls = bulmaHelper(bulma, 'box');

	function onPage() {
		dispatch('page', page);
	}
</script>

<li>
	<a
		href="/"
		class="pagination-link"
		class:is-current={isCurrent}
		aria-label="Goto page {page}"
		on:click|preventDefault={onPage}
	>
		{page}
	</a>
</li>
