<script lang="ts">
	import type { BulmaOptions, LabelSize } from '$lib/utils/bulma.types.js';
	import { fieldLabel } from './misc.js';

	export let opts: BulmaOptions = {};
	export let size: LabelSize | undefined = undefined;

	$: cls = fieldLabel.cls({ opts, size });
</script>

<div class={cls}>
	<slot />
</div>
