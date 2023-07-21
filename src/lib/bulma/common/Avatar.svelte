<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';

	export let avatar: string;
	export let className: app.ClsArgument = '';
	export let helper: bulma.Helper = {};
	export let size: number = 24;

	const noImage = '/images/no-image.png';

	let hasError: boolean = false;

	$: cls = bulmaHelper(helper, ['avatar', className]);

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
