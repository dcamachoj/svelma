<script lang="ts">
	import type { BulmaOptions, OlType } from '$lib/utils/bulma.types.js';
	import { orderedListClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let type: OlType;

	$: cls = orderedListClass.cls({ opts, type });
</script>

<div class={cls}>
	<slot />
</div>
