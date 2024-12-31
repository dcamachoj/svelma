<script lang="ts">
	import { classnames, type ClsArgument } from '$lib/utils/classnames.js';
	import { EnvPublic } from '$lib/utils/env.js';
	import { onMount } from 'svelte';

	const env = EnvPublic.getInstance();

	export let overflowClassname: ClsArgument = '';
	export let overflowContainerClassname: ClsArgument = '';
	export let gap: string = '';

	let divEl: HTMLElement;
	let mounted = false;
	let height = 0;

	$: style = height ? `max-height: ${height}px;` : '';
	$: containerStyle = gap ? `gap: ${gap};` : '';

	onMount(() => {
		height = divEl.clientHeight;
		mounted = true;
	});
</script>

<div bind:this={divEl} class="overflow {classnames(overflowClassname)}" class:mounted {style}>
	<div class="overflow-content {classnames(overflowContainerClassname)}" style={containerStyle}>
		<slot />
	</div>
</div>

<style lang="less">
	.overflow {
		width: 100%;
		height: 100%;

		.overflow-content {
			width: 100%;
			height: 100%;
			overflow-y: auto;
			display: none !important;
			flex-direction: column;
			align-items: stretch;
		}

		&.mounted {
			.overflow-content {
				display: flex !important;
			}
		}
	}
</style>
