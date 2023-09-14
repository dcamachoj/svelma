<script lang="ts">
	import { bulmaHelper, type BulmaHelper, type IconTextData } from '$lib/utils/bulma.js';
	import { icons } from '$lib/bulma/common/icons.js';
	import type { ClsArgument } from '$lib/utils/classnames.js';

	export let icon: string = '';
	export let text: string = '';
	export let className: ClsArgument = '';
	export let bulma: BulmaHelper = {};
	export let block: boolean = false;

	$: iconsData = Array.isArray(icon) ? icon : [icon];
	$: cls = bulmaHelper(bulma, [className, { block }]);
	$: clsIcon = bulmaHelper(bulma, ['icon', className]);
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
	<span class="icon-text {cls}">
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
