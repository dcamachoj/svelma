<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { navbarDropdownClass } from './navbar.js';

	export let opts: BulmaOptions = {};
	export let right: boolean = false;
	export let dropdownUp: boolean = false;
	export let boxed: boolean = false;

	$: cls = navbarDropdownClass.cls({ opts, right, dropdownUp, boxed });
</script>

<div class={cls}>
	<slot />
</div>
