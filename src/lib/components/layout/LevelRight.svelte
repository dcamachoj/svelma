<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { levelRightClass } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = levelRightClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
