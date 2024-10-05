<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { fieldBody } from './misc.js';

	export let opts: BulmaOptions = {};

	$: cls = fieldBody.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
