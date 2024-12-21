<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { modalCardTitleClass } from './modal.js';

	export let opts: BulmaOptions = {};
	export let header: string = '';

	$: cls = modalCardTitleClass.cls({ opts });
</script>

<p class={cls}><slot>{header}</slot></p>
