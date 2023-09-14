<script lang="ts">
	import type { classnames } from '$lib/utils/classnames.js';
	import type { Colors, BwColors } from '$lib/utils/bulma.js';

	export let isTransparent: boolean = false;
	export let fixed: 'top' | 'bottom' | undefined = undefined;
	export let color: Colors | BwColors | undefined = undefined;
	export let isSpaced: boolean = false;
	export let hasShadow: boolean = false;

	$: cls = classnames(color ? `is-${color}` : '');
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
