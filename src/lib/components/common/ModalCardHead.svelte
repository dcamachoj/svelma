<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { createEventDispatcher } from 'svelte';
	import { modalCardHead } from './modal.js';
	import ModalCardTitle from './ModalCardTitle.svelte';

	const dispatch = createEventDispatcher();

	export let opts: BulmaOptions = {};
	export let header: string = '';

	$: cls = modalCardHead.cls({ opts });

	function onClose() {
		dispatch('close');
	}
</script>

<header class={cls}>
	<slot>
		<ModalCardTitle {header} />
		<button class="delete" type="button" aria-label="close" on:click={onClose} />
	</slot>
</header>

<style>
	.modal-card-title {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
