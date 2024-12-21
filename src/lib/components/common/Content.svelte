<script lang="ts">
	import type { BulmaOptions, ContentSize } from '$lib/utils/bulma.types.js';
	import { contentClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let size: ContentSize | undefined = undefined;

	$: cls = contentClass.cls({ opts, size });
</script>

<div class={cls}>
	<slot />
</div>
