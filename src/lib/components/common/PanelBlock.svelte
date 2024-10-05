<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { panelBlock } from './panel.js';

	export let opts: BulmaOptions = {};

	$: cls = panelBlock.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
