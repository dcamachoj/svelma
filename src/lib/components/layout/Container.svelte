<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { container } from './misc.js';

	export let opts: BulmaOptions = {};
	export let widescreen: boolean = false;
	export let fullhd: boolean = false;
	export let maxWidescreen: boolean = false;
	export let maxDesktop: boolean = false;
	export let fluid: boolean = false;

	$: cls = container.cls({ opts, widescreen, fullhd, maxDesktop, maxWidescreen, fluid });
</script>

<div class={cls}>
	<slot />
</div>
