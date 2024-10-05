<script lang="ts">
	import type { BulmaOptions, BwColors, Colors, TagSize } from '$lib/utils/bulma.types.js';
	import { tag } from './misc.js';
	import { panelHeading } from './panel.js';

	export let opts: BulmaOptions = {};
	export let color: Colors | BwColors | undefined = undefined;
	export let size: TagSize | undefined = undefined;
	export let rounded: boolean = false;
	export let hoverable: boolean = false;
	export let del: boolean = false;

	$: cls = tag.cls({ opts, color, size, rounded, hoverable, del });
</script>

<span class={cls}>
	<slot />
</span>
