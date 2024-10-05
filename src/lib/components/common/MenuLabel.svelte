<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import IconText from './IconText.svelte';
	import { menuLabel } from './menu.js';

	export let opts: BulmaOptions = {};
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;

	$: cls = menuLabel.cls({ opts });
</script>

<p class={cls}>
	<slot>
		<IconText {icon} {text} />
	</slot>
</p>
