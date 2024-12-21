<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { cardContentClass } from './card.js';

	export let opts: BulmaOptions = {};

	$: cls = cardContentClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
