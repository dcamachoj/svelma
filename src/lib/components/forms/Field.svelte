<script lang="ts">
	import type { BulmaOptions, FieldAlign } from '$lib/utils/bulma.types.js';
	import Control from './Control.svelte';
	import FieldBody from './FieldBody.svelte';
	import FieldLabel from './FieldLabel.svelte';
	import Help from './Help.svelte';
	import Label from './Label.svelte';
	import { fieldClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let addons: boolean = false;
	export let addonsCentered: boolean = false;
	export let addonsRight: boolean = false;
	export let grouped: FieldAlign | undefined = undefined;
	export let groupedMultiline: boolean = false;
	export let horizontal: boolean = false;

	$: cls = fieldClass.cls({
		opts,
		addons,
		addonsCentered,
		addonsRight,
		grouped,
		groupedMultiline,
		horizontal,
	});
</script>

<div class={cls}>
	<slot {FieldLabel} {FieldBody} {Control} {Help} {Label} />
</div>
