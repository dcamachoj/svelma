<script lang="ts">
	import type {
		BulmaOptions,
		BwColors,
		Colors,
		ContentSize,
		DarkColors,
		GreyColors,
		LightColors,
	} from '$lib/utils/bulma.types.js';
	import { mdiImageBroken } from '@mdi/js';
	import { iconClass, type IconType } from './icon.js';
	import { classnames, type ClsArgument } from '$lib/utils/classnames.js';

	export let icon: string;
	export let type: IconType = 'icon';
	export let opts: BulmaOptions = {};
	export let iconClassname: ClsArgument = '';
	export let color: Colors | BwColors | GreyColors | LightColors | DarkColors | undefined =
		undefined;
	export let size: ContentSize | undefined = undefined;
	export let align: 'left' | 'right' | undefined = undefined;

	$: cls = [iconClass.cls({ opts, type, color, size, align }), classnames(iconClassname)]
		.filter(Boolean)
		.join(' ');
	$: iconData = icon || mdiImageBroken;
</script>

<span class={cls}>
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="currentColor" d={iconData} />
	</svg>
</span>
