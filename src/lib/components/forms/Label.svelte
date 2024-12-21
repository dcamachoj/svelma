<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { labelClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let id: string | undefined = undefined;

	$: cls = labelClass.cls({ opts });
</script>

<label class={cls} for={id}>
	<slot />
</label>
