<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modalCardBodyClass } from './modal.js';

	export let opts: BulmaOptions = {};

	$: cls = modalCardBodyClass.cls({ opts });
</script>

<section class={cls}>
	<slot />
</section>
