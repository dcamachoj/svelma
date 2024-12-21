<script lang="ts">
	import type { BulmaOptions, BwColors, Colors, TagSize } from '$lib/utils/bulma.types.js';
	import { tagClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let color: Colors | BwColors | undefined = undefined;
	export let size: TagSize | undefined = undefined;
	export let rounded: boolean = false;
	export let hoverable: boolean = false;
	export let del: boolean = false;

	$: cls = tagClass.cls({ opts, color, size, rounded, hoverable, del });
</script>

<span class={cls}>
	<slot />
</span>
