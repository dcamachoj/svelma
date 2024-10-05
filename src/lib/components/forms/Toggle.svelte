<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { toggle, toggleContent, toggleSlider } from './input.js';

	export let opts: BulmaOptions = {};
	export let rounded: boolean = false;
	export let id: string | undefined = undefined;
	export let checked: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	$: cls = toggle.cls({ opts });
	$: clsSlider = toggleSlider.cls({ rounded });
	$: clsContent = toggleContent.cls({});
</script>

<label class={cls}>
	<input type="checkbox" {id} name={id} {checked} disabled={disabled || undefined} />
	<span class={clsSlider}></span>
	<span class={clsContent}><slot /></span>
</label>
