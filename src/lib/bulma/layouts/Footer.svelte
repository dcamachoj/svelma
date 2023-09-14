<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};

	$: cls = bulmaHelper(bulma, 'footer');
</script>

<footer class={cls}>
	<slot />
</footer>
