<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import { icons } from '$lib/bulma/common/icons.js';

	export let icon: string;
	export let className: app.ClsArgument = '';
	export let helper: bulma.Helper = {};

	$: cls = bulmaHelper(helper, ['icon', className]);
	$: iconData = icon || icons.noImage;
</script>

<span class={cls}>
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="currentColor" d={iconData} />
	</svg>
</span>
