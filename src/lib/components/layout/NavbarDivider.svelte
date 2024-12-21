<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarDividerClass } from './navbar.js';

	export let opts: BulmaOptions = {};

	$: cls = navbarDividerClass.cls({ opts });
</script>

<hr class={cls} />
