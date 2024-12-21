<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { createEventDispatcher } from 'svelte';
	import { modalCloseClass } from './modal.js';

	const dispatch = createEventDispatcher();

	export let opts: BulmaOptions = {};

	$: cls = modalCloseClass.cls({ opts });

	function onClose() {
		dispatch('close');
	}
</script>

<button class={cls} aria-label="close" on:click={onClose}></button>
