<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarStart } from './navbar.js';

	export let opts: BulmaOptions = {};

	$: cls = navbarStart.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
