<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { messageHeaderClass } from './misc.js';
	import IconText from './IconText.svelte';
	import Delete from './Delete.svelte';

	export let opts: BulmaOptions = {};
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;

	$: cls = messageHeaderClass.cls({ opts });
</script>

<div class="message-header">
	<slot>
		<IconText {icon} {text} />
		<Delete on:click />
	</slot>
</div>
