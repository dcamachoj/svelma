<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import Icon from './Icon.svelte';
	import { panelIcon } from './panel.js';

	export let opts: BulmaOptions = {};
	export let icon: string;

	$: cls = panelIcon.cls({ opts });
</script>

<Icon {icon} iconClass={cls} />
