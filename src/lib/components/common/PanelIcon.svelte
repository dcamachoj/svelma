<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import Icon from './Icon.svelte';
	import { panelIconClass } from './panel.js';

	export let opts: BulmaOptions = {};
	export let icon: string;

	$: cls = panelIconClass.cls({ opts });
</script>

<Icon {icon} iconClassname={cls} />
