<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { tagsClass } from './misc.js';
	import Tag from './Tag.svelte';

	export let opts: BulmaOptions = {};

	$: cls = tagsClass.cls({ opts });
</script>

<div class={cls}>
	<slot {Tag} />
</div>
