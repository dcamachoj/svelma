<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import ModalCardBody from './ModalCardBody.svelte';
	import ModalCardFoot from './ModalCardFoot.svelte';
	import ModalCardHead from './ModalCardHead.svelte';
	import { modalCardClass } from './modal.js';

	export let opts: BulmaOptions = {};

	$: cls = modalCardClass.cls({ opts });
</script>

<div class={cls}>
	<slot {ModalCardHead} {ModalCardBody} {ModalCardFoot} />
</div>
