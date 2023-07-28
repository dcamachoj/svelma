<script lang="ts">
	import { classnames } from '$lib/utils/classnames.js';

	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';
	import type { app } from '$lib/types/index.js';

	const dispatch = createEventDispatcher();

	export let active: boolean;
	export let header: string = '';
	export let actions: app.Action[] | undefined = undefined;

	$: cls = classnames('modal', { 'is-active': active });

	function onClose() {
		dispatch('close');
	}
	function onAction(action: app.Action): app.Click {
		return (e?: any) => {
			dispatch('action', action);
		};
	}
</script>

<div class={cls}>
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{header}<slot name="header" /></p>
			<button class="delete" aria-label="close" on:click={onClose} />
		</header>
		<section class="modal-card-body">
			<slot />
		</section>
		<footer class="modal-card-foot">
			{#if actions}
				{#each actions as action (action.name)}
					<button class="button" on:click={onAction(action)}>
						{#if action.icon}
							<Icon icon={action.icon} className={{ 'pr-1': action.text }} />
						{/if}
						{#if action.text}
							<span>{action.text}</span>
						{/if}
					</button>
				{/each}
			{/if}
			<slot name="actions" />
		</footer>
	</div>
</div>
