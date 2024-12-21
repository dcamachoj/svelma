<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modalBackgroundClass } from './modal.js';

	export let opts: BulmaOptions = {};

	$: cls = modalBackgroundClass.cls({ opts });
</script>

<div class={cls}><slot /></div>
