<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modalBackground } from './modal.js';

	export let opts: BulmaOptions = {};

	$: cls = modalBackground.cls({ opts });
</script>

<div class={cls}><slot /></div>
