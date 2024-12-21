<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { levelLeftClass } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = levelLeftClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
