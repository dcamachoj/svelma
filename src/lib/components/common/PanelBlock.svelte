<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { panelBlockClass } from './panel.js';

	export let opts: BulmaOptions = {};

	$: cls = panelBlockClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
