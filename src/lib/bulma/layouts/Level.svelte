<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let isMobile: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'level',
		{
			'is-mobile': isMobile
		}
	]);
</script>

<nav class={cls}>
	<slot />
</nav>
