<script>import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let href;
export let preventDefault = true;
export let isExpanded = false;
export let isTab = false;
export let isActive = false;
function onClick(e) {
  if (preventDefault) {
    e.preventDefault();
  }
  dispatch("clicked");
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
