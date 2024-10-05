<script lang="ts">
	import { bulmaClassnames } from '$lib/utils/bulma.js';
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import type { ClsArgument } from '$lib/utils/classnames.js';

	export let avatar: string;
	export let className: ClsArgument = '';
	export let options: BulmaOptions = {};
	export let size: number = 24;

	const noImage = '/images/no-image.png';

	let hasError: boolean = false;

	$: cls = bulmaClassnames(options, ['avatar', className]);

	function onError() {
		hasError = true;
	}
</script>

<img
	src={hasError || !avatar ? noImage : avatar}
	alt="Avatar"
	class={cls}
	style="width: {size}px; height: {size}px;"
	on:error={onError}
/>

<style>
	.avatar {
		vertical-align: middle;
		border-radius: 50%;
	}
</style>
