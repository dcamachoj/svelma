<script lang="ts">
	import { appMenuEnd, appMenuStart, type MenuAction } from '$lib/utils/stores.js';
	import { onDestroy, onMount } from 'svelte';

	export let start: MenuAction[] = [];
	export let end: MenuAction[] = [];

	onMount(() => {
		$appMenuStart = start;
		$appMenuEnd = end;
	});
	onDestroy(() => {
		$appMenuStart = [];
		$appMenuEnd = [];
	});
</script>

<slot />
