<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import LevelItem from './LevelItem.svelte';
	import LevelLeft from './LevelLeft.svelte';
	import LevelRight from './LevelRight.svelte';
	import { levelClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let mobile: boolean = false;

	$: cls = levelClass.cls({ opts, mobile });
</script>

<nav class={cls}>
	<slot {LevelLeft} {LevelRight} {LevelItem} />
</nav>
