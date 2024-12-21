<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarMenuClass } from './navbar.js';

	export let opts: BulmaOptions = {};
	export let active: boolean = false;
	export let id: string;

	$: cls = navbarMenuClass.cls({ opts, active });
</script>

<div {id} class={cls}>
	<slot />
</div>
