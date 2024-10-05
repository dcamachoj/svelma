<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { tags } from './misc.js';
	import Tag from './Tag.svelte';

	export let opts: BulmaOptions = {};

	$: cls = tags.cls({ opts });
</script>

<div class={cls}>
	<slot {Tag} />
</div>
