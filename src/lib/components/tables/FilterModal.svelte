<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import { mdiFilter } from '@mdi/js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let header: string | undefined;

	function hideFilter() {
		dispatch('hide');
	}
	function clearFilter() {
		dispatch('clear');
	}
	function saveFilter() {
		dispatch('save');
	}
</script>

<div class="modal is-active">
	<div class="modal-background"></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">
				<Icon icon={mdiFilter} />
				{header || ''}
			</p>
			<button class="delete" aria-label="close" on:click={hideFilter}></button>
		</header>
		<section class="modal-card-body">
			<slot />
		</section>
		<footer class="modal-card-foot">
			<div class="buttons is-right">
				<button class="button is-success" on:click={saveFilter}>Aplicar</button>
				<button class="button" on:click={hideFilter}>Cancelar</button>
				<button class="button" on:click={clearFilter}>Limpiar</button>
			</div>
		</footer>
	</div>
</div>
