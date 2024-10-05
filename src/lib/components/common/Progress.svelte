<script lang="ts">
	import type { BulmaOptions, Colors, ContentSize } from '$lib/utils/bulma.types.js';
	import { progress } from './misc.js';

	export let opts: BulmaOptions = {};
	export let color: Colors | undefined = undefined;
	export let size: ContentSize | 'normal' | undefined = undefined;
	export let value: number | undefined = undefined;
	export let max: number = 100;

	$: cls = progress.cls({ opts, color, size });
</script>

{#if value == undefined}
	<progress class={cls}><slot /></progress>
{:else}
	<progress class={cls} {value} {max}>
		<slot>
			{value.toFixed(0)}%
		</slot>
	</progress>
{/if}
