<script lang="ts">
	import { bulmaHelper, type BulmaHelper, type IconTextData } from '$lib/utils/bulma.js';
	import type { ClsArgument } from '$lib/utils/classnames.js';

	export let icons: IconTextData[];
	export let className: ClsArgument = '';
	export let bulma: BulmaHelper = {};
	export let block: boolean = false;

	$: cls = bulmaHelper(bulma, [className, { block }]);
</script>

<span class="icon-text {cls}">
	{#each icons as i}
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
