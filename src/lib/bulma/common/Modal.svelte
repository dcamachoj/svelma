<script lang="ts">
	import { classnames } from '$lib/utils/classnames.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let active: boolean;

	$: cls = classnames('modal', { 'is-active': active });

	function onClose() {
		dispatch('close');
	}
</script>

<div class={cls}>
	<div class="modal-background" />
	<div class="modal-content">
		<slot />
	</div>
	<button class="modal-close is-large" aria-label="close" on:click={onClose} />
</div>
