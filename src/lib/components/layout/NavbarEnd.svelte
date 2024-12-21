<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarEndClass } from './navbar.js';

	export let opts: BulmaOptions = {};

	$: cls = navbarEndClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
