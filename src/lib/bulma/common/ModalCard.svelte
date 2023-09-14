<script lang="ts">
	import { classnames, type ClsArgument } from '$lib/utils/classnames.js';
	import type { Action, Click } from '$lib/utils/bulma.js';

	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';
	import IconText from './IconText.svelte';

	const dispatch = createEventDispatcher();

	export let active: boolean;
	export let header: string = '';
	export let actions: Action[] | undefined = undefined;
	export let classes: ClsArgument = '';

	$: cls = classnames('modal', { 'is-active': active }, classes);

	function onClose() {
		dispatch('close');
	}
	function onAction(action: Action): Click {
		return (e?: any) => {
			dispatch('action', action);
		};
	}
</script>

<div class={cls}>
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title"><span>{header}</span><slot name="header" /></p>
			<button class="delete" aria-label="close" on:click={onClose} />
		</header>
		<section class="modal-card-body">
			<slot />
		</section>
		<footer class="modal-card-foot">
			{#if actions}
				{#each actions as action (action.name)}
					<button class="button" on:click={onAction(action)}>
						<IconText icon={action.icon} text={action.text} />
					</button>
				{/each}
			{/if}
			<slot name="actions" />
		</footer>
	</div>
</div>

<style>
	.modal-card-title {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
