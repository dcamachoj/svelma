<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let checked: boolean;

	$: cls = bulmaHelper(bulma, 'panel-block');
</script>

<label class={cls}>
	<input type="checkbox" {checked} on:click />
	<slot />
</label>
