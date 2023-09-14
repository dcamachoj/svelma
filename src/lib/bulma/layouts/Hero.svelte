<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors, HeroSize } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let color: Colors | undefined = undefined;
	export let size: HeroSize | undefined = undefined;
	export let isFullHeightWithNavbar: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'hero',
		{
			[`is-${color}`]: color != undefined,
			[`is-${size}`]: size != undefined,
			'is-fullheight-with-navbar': isFullHeightWithNavbar
		}
	]);
</script>

<section class={cls}>
	<slot />
</section>
