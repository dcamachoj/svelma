<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { levelItemClass } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = levelItemClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
