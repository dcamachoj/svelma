<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { label } from './misc.js';

	export let opts: BulmaOptions = {};
	export let id: string | undefined = undefined;

	$: cls = label.cls({ opts });
</script>

<label class={cls} for={id}>
	<slot />
</label>
