<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import IconText from './IconText.svelte';
	import { tabClass } from './tabs.js';

	export let opts: BulmaOptions = {};
	export let active: boolean;
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;
	export let href: string = '/';

	$: cls = tabClass.cls({ opts, active });
</script>

<li class={cls}>
	<a {href} on:click>
		<slot>
			<IconText {icon} {text} />
		</slot>
	</a>
</li>
