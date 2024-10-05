<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modalContent } from './modal.js';

	export let opts: BulmaOptions = {};

	$: cls = modalContent.cls({ opts });
</script>

<div class={cls}>
	<slot />
</div>
