<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { fieldBodyClass } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = fieldBodyClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
