<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modal } from './modal.js';
	import ModalBackground from './ModalBackground.svelte';
	import ModalClose from './ModalClose.svelte';
	import ModalContent from './ModalContent.svelte';
	import ModalCard from './ModalCard.svelte';

	export let opts: BulmaOptions = {};
	export let active: boolean;

	$: cls = modal.cls({ opts, active });
</script>

<div class={cls}>
	<slot {ModalBackground} {ModalContent} {ModalClose} {ModalCard}>
		<ModalBackground />
		<ModalContent>
			<slot name="content" />
		</ModalContent>
		<ModalClose on:close />
	</slot>
</div>
