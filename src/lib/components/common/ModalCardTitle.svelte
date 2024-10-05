<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modalCardTitle } from './modal.js';

	export let opts: BulmaOptions = {};
	export let header: string = '';

	$: cls = modalCardTitle.cls({ opts });
</script>

<p class={cls}><slot>{header}</slot></p>
