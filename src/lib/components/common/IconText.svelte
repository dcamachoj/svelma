<script lang="ts">
	import type { ClsArgument } from '$lib/utils/classnames.js';
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { bulmaClassnames } from '$lib/utils/bulma.js';

	export let icon: string = '';
	export let text: string = '';
	export let className: ClsArgument = '';
	export let opts: BulmaOptions = {};
	export let block: boolean = false;

	$: clsText = bulmaClassnames(opts, [className, { block }]);
	$: clsIcon = bulmaClassnames(opts, ['icon', className]);
</script>

{#if icon && !text}
	<span class={clsIcon}>
		<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="currentColor" d={icon} />
		</svg>
	</span>
{/if}
{#if text && !icon}
	<span>{text}</span>
{/if}
{#if icon && text}
	<span class="icon-text {clsText}">
		<span class="icon">
			<svg style="width:24px;height:24px" viewBox="0 0 24 24">
				<path fill="currentColor" d={icon} />
			</svg>
		</span>
		<span>{text}</span>
	</span>
{/if}

<style>
	.icon-text.block {
		display: block;
	}
</style>
