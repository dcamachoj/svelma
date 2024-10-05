<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { panelHeading } from './panel.js';

	export let opts: BulmaOptions = {};

	$: cls = panelHeading.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
