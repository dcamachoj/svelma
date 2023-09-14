<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let href: string;
	export let preventDefault: boolean = true;
	export let isExpanded: boolean = false;
	export let isTab: boolean = false;
	export let isActive: boolean = false;

	function onClick(e: MouseEvent) {
		if (preventDefault) {
			e.preventDefault();
		}
		dispatch('clicked');
	}
</script>

<a
	class="navbar-item"
	{href}
	class:is-expanded={isExpanded}
	class:is-tab={isTab}
	class:is-active={isActive}
	on:click={onClick}
>
	<slot />
</a>
