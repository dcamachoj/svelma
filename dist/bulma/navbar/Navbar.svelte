<script>export let isTransparent = false;
export let fixed = void 0;
export let color = void 0;
export let isSpaced = false;
export let hasShadow = false;
$:
  cls = classnames(color ? `is-${color}` : "");
</script>

<nav
	class="navbar {cls}"
	class:is-transparent={isTransparent}
	class:is-fixed-top={fixed === 'top'}
	class:is-fixed-bottom={fixed === 'bottom'}
	class:is-spaced={isSpaced}
	class:has-dhadow={hasShadow}
	aria-label="main navigation"
>
	<slot />
</nav>
