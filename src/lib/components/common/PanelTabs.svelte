<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { panelTabsClass } from './panel.js';
	import PanelTab from './PanelTab.svelte';

	export let opts: BulmaOptions = {};

	$: cls = panelTabsClass.cls({ opts });
</script>

<p class={cls}>
	<slot {PanelTab} />
</p>
