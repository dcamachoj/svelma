<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modalCardBody } from './modal.js';

	export let opts: BulmaOptions = {};

	$: cls = modalCardBody.cls({ opts });
</script>

<section class={cls}>
	<slot />
</section>
