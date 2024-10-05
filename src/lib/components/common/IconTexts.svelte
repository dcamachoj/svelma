<script lang="ts">
	import { bulmaClassnames } from '$lib/utils/bulma.js';
	import type { BulmaOptions, IconTextData } from '$lib/utils/bulma.types.js';
	import type { ClsArgument } from '$lib/utils/classnames.js';

	export let items: IconTextData[];
	export let className: ClsArgument = '';
	export let opts: BulmaOptions = {};
	export let block: boolean = false;

	$: cls = bulmaClassnames(opts, [className, { block }]);
</script>

<span class="icon-text {cls}">
	{#each items as i}
		<span class="icon">
			<svg style="width:24px;height:24px" viewBox="0 0 24 24">
				<path fill="currentColor" d={i.icon} />
			</svg>
		</span>
		<span>{i.text}</span>
	{/each}
</span>

<style>
	.icon-text.block {
		display: block;
	}
</style>
