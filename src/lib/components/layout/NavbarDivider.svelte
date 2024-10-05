<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarDivider } from './navbar.js';

	export let opts: BulmaOptions = {};

	$: cls = navbarDivider.cls({ opts });
</script>

<hr class={cls} />
