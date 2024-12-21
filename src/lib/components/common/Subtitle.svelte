<script lang="ts">
	import type { BulmaOptions, TitleSize } from '$lib/utils/bulma.types.js';
	import { subtitleClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let size: TitleSize | undefined = undefined;

	$: cls = subtitleClass.cls({ opts, size });
</script>

<div class={cls}>
	<slot />
</div>
