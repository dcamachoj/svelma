<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarStartClass } from './navbar.js';

	export let opts: BulmaOptions = {};

	$: cls = navbarStartClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
