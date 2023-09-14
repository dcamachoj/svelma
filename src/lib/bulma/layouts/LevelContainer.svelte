<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let isRight: boolean = false;

	$: cls = bulmaHelper(bulma, isRight ? 'level-right' : 'level-left');
</script>

<div class={cls}>
	<slot />
</div>
