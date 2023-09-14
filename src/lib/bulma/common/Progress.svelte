<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let value: number;
	export let max: number = 100;
	export let min: number = 0;
	export let indeterminate: boolean = false;
	export let size: ContentSize | 'normal' | undefined = undefined;
	export let color: Colors | undefined = undefined;

	$: cls = bulmaHelper(bulma, [
		'progress',
		{
			[`is-${size}`]: size != undefined,
			[`is-${color}`]: color != undefined
		}
	]);
</script>

{#if !indeterminate}
	<progress class={cls} {value} {max} {min}
		><slot>
			{value.toFixed(0)}%
		</slot>
	</progress>
{:else}
	<progress class={cls}><slot /></progress>
{/if}
