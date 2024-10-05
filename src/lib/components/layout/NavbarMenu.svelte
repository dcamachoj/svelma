<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarMenu } from './navbar.js';

	export let opts: BulmaOptions = {};
	export let active: boolean = false;
	export let id: string;

	$: cls = navbarMenu.cls({ opts, active });
</script>

<div {id} class={cls}>
	<slot />
</div>
