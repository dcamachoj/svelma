<script lang="ts">
	import IconText from '$lib/bulma/common/IconText.svelte';

	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;
	export let isHoverable: boolean = false;
	export let isRight: boolean = false;
	export let isUp: boolean = false;
	export let isArrowless: boolean = false;
	export let isBoxed: boolean = false;
</script>

<div class="navbar-item has-dropdown" class:is-hoverable={isHoverable}>
	<a href="/" class="navbar-link" class:is-arrowless={isArrowless} on:click|preventDefault>
		<IconText {icon} {text} />
	</a>
	<div
		class="navbar-dropdown"
		class:is-right={isRight}
		class:has-dropdown-up={isUp}
		class:is-boxed={isBoxed}
	>
		<slot />
	</div>
</div>
