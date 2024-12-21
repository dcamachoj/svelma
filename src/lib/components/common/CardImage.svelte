<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { cardImageClass } from './card.js';

	export let opts: BulmaOptions = {};

	$: cls = cardImageClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
