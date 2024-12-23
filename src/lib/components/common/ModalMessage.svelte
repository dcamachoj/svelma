<script lang="ts">
	import type { ButtonColor } from '$lib/utils/bulma.types.js';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';

	const dispatch = createEventDispatcher();

	export let header: string;
	export let message: string;
	export let okIcon: string;
	export let okText: string;
	export let okColor: ButtonColor | undefined = 'primary';
	export let cancelIcon: string;
	export let cancelText: string;

	function hideDialog() {
		dispatch('hide');
	}
	function saveDialog() {
		dispatch('save');
	}
</script>

<Modal active let:ModalBackground let:ModalCard on:close={hideDialog}>
	<ModalBackground />
	<ModalCard let:ModalCardHead let:ModalCardBody let:ModalCardFoot>
		<ModalCardHead {header} on:close={hideDialog} />
		<ModalCardBody>
			{message}
		</ModalCardBody>
		<ModalCardFoot>
			<div class="buttons">
				<Button
					element="button"
					icon={okIcon}
					text={okText}
					color={okColor}
					on:click={saveDialog}
				/>
				<Button element="button" icon={cancelIcon} text={cancelText} on:click={hideDialog} />
			</div>
		</ModalCardFoot>
	</ModalCard>
</Modal>
