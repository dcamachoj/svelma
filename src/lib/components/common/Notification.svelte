<script lang="ts">
	import type { BulmaOptions, Colors } from '$lib/utils/bulma.types.js';
	import { notificationClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let color: Colors | undefined = undefined;
	export let light: boolean = false;
	export let hasDelete: boolean = false;

	$: cls = notificationClass.cls({ opts, color, light });
</script>

<div class={cls}>
	{#if hasDelete}
		<button class="delete" on:click />
	{/if}
	<slot />
</div>
