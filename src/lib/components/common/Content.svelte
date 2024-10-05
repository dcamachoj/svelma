<script lang="ts">
	import type { BulmaOptions, ContentSize } from '$lib/utils/bulma.types.js';
	import { content } from './misc.js';

	export let opts: BulmaOptions = {};
	export let size: ContentSize | undefined = undefined;

	$: cls = content.cls({ opts, size });
</script>

<div class={cls}>
	<slot />
</div>
