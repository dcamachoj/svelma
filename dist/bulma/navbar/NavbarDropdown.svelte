<script>import IconText from "../common/IconText.svelte";
export let icon = void 0;
export let text = void 0;
export let isHoverable = false;
export let isRight = false;
export let isUp = false;
export let isArrowless = false;
export let isBoxed = false;
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
