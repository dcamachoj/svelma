<script lang="ts">
	import { appTitle } from '$lib/utils/stores.js';
	import { onDestroy, onMount } from 'svelte';

	export let title: string;

	onMount(() => {
		$appTitle = title;
	});
	onDestroy(() => {
		//$appTitle = '';
	});
</script>

<slot />
