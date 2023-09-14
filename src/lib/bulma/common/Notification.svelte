<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let color: Colors | undefined = undefined;
	export let hasDelete: boolean = false;
	export let isLight: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'notification',
		{
			[`is-${color}`]: color != undefined,
			'is-light': isLight
		}
	]);
</script>

<div class={cls}>
	{#if hasDelete}
		<button class="delete" on:click />
	{/if}
	<slot />
</div>
