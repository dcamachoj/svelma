<script lang="ts">
	import type { BulmaOptions, Colors } from '$lib/utils/bulma.types.js';
	import { panel } from './panel.js';
	import PanelBlock from './PanelBlock.svelte';
	import PanelCheckbox from './PanelCheckbox.svelte';
	import PanelHeading from './PanelHeading.svelte';
	import PanelIcon from './PanelIcon.svelte';
	import PanelTabs from './PanelTabs.svelte';

	export let opts: BulmaOptions = {};
	export let color: Colors | undefined = undefined;

	$: cls = panel.cls({ opts, color });
</script>

<nav class={cls}>
	<slot {PanelHeading} {PanelBlock} {PanelIcon} {PanelCheckbox} {PanelTabs} />
</nav>
