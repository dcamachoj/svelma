<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	export let opts: BulmaOptions = {};
	import { messageBodyClass } from './misc.js';

	$: cls = messageBodyClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
