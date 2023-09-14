<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, TitleSize } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let subtitle: boolean = false;
	export let size: TitleSize | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		subtitle ? 'subtitle' : 'title',
		{
			[`is-${size}`]: size != undefined
		}
	]);
</script>

<p class={cls}>
	<slot />
</p>
