<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';
	import Icon from '$lib/bulma/common/Icon.svelte';

	export let bulma: BulmaHelper = {};
	export let icon: string;

	$: cls = bulmaHelper(bulma, 'panel-icon');
</script>

<Icon {icon} iconClass={cls} />
