<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarEnd } from './navbar.js';

	export let opts: BulmaOptions = {};

	$: cls = navbarEnd.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
