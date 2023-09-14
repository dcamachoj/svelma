<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, ClsArgument, TileSize } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let className: ClsArgument = '';
	export let size: TileSize | undefined = undefined;
	export let isAncestor: boolean = false;
	export let isParent: boolean = false;
	export let isChild: boolean = false;
	export let isVertical: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'tile',
		className,
		{
			[`is-${size}`]: size != undefined,
			'is-ancestor': isAncestor,
			'if-parent': isParent,
			'is-child': isChild,
			'is-vertical': isVertical
		}
	]);
</script>

<div class={cls}>
	<slot />
</div>
