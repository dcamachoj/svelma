<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modalContentClass } from './modal.js';

	export let opts: BulmaOptions = {};

	$: cls = modalContentClass.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
