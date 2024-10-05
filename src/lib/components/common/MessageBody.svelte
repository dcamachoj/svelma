<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	export let opts: BulmaOptions = {};
	import { messageBody } from './misc.js';

	$: cls = messageBody.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
