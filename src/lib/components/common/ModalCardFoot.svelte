<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modalCardFoot } from './modal.js';

	export let opts: BulmaOptions = {};

	$: cls = modalCardFoot.cls({ opts });
</script>

<footer class={cls}>
	<slot />
</footer>
