<script lang="ts">
	import { bulmaHelper, type BulmaHelper } from '$lib/utils/bulma.js';
	import { icons } from '$lib/bulma/common/icons.js';
	import type { ClsArgument } from '$lib/utils/classnames.js';

	export let icon: string;
	export let iconClass: string = 'icon';
	export let className: ClsArgument = '';
	export let helper: BulmaHelper = {};

	$: cls = bulmaHelper(helper, [iconClass, className]);
	$: iconData = icon || icons.noImage;
</script>

<span class={cls}>
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="currentColor" d={iconData} />
	</svg>
</span>
