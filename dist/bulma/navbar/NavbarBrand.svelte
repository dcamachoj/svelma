<script>import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let homeUrl;
export let logoUrl;
export let logoWidth;
export let logoHeight;
export let dataTarget;
export let menuOpen = false;
function onMenuToggle() {
  menuOpen = !menuOpen;
  dispatch(menuOpen ? "menu-opened" : "menu-closed");
}
</script>

<div class="navbar-brand">
	<a class="navbar-item" href={homeUrl}>
		<img src={logoUrl} alt="logo" width={logoWidth} height={logoHeight} />
	</a>

	<a
		href="/"
		role="button"
		class="navbar-burger"
		aria-label="menu"
		aria-expanded="false"
		data-target={dataTarget}
		on:click|preventDefault={onMenuToggle}
	>
		<span aria-hidden="true" />
		<span aria-hidden="true" />
		<span aria-hidden="true" />
	</a>
</div>
