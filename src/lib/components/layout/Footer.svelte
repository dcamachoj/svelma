<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { footer } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = footer.cls({ opts });
</script>

<footer class={cls}>
	<slot />
</footer>
