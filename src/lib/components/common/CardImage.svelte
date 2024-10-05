<script lang="ts">
	import { bulmaClassnames } from '$lib/utils/bulma.js';
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';

	export let opts: BulmaOptions = {};

	$: cls = bulmaClassnames(opts, ['card-image']);
</script>

<div class={cls}>
	<slot />
</div>
