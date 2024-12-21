<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { panelHeadingClass } from './panel.js';

	export let opts: BulmaOptions = {};

	$: cls = panelHeadingClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
