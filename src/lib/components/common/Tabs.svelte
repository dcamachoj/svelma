<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import Tab from './Tab.svelte';
	import { tabs } from './tabs.js';

	export let opts: BulmaOptions = {};

	$: cls = tabs.cls({ opts });
</script>

<div class={cls}>
	<ul>
		<slot {Tab} />
	</ul>
</div>
