<script lang="ts">
	import type { BulmaOptions, PaginationPage } from '$lib/utils/bulma.types.js';
	import { createEventDispatcher } from 'svelte';
	import { paginationPrevClass } from './pagination.js';
	import IconText from './IconText.svelte';

	const dispatch = createEventDispatcher();

	export let opts: BulmaOptions = {};
	export let href: string = '/';
	export let page: PaginationPage;
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;

	$: cls = paginationPrevClass.cls({ opts });

	function onPage() {
		dispatch('page', page);
	}
</script>

<a {href} class={cls} on:click|preventDefault={onPage}>
	<slot>
		<IconText {icon} {text} />
	</slot>
</a>
