<script lang="ts">
	import { bulmaHelper, type BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};

	$: cls = bulmaHelper(bulma, 'block');
</script>

<div class={cls}>
	<slot />
</div>
