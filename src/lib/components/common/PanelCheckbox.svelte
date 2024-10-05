<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { panelBlock } from './panel.js';

	export let opts: BulmaOptions = {};
	export let id: string;
	export let checked: boolean;

	$: cls = panelBlock.cls({ opts });
</script>

<label class={cls}>
	<input type="checkbox" {id} name={id} {checked} />
	<slot />
</label>
