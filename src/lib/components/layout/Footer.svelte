<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { footerClass } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = footerClass.cls({ opts });
</script>

<footer class={cls}>
	<slot />
</footer>
