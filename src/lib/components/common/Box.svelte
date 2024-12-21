<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { boxClass } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = boxClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
