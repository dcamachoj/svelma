<script lang="ts">
	import type { BulmaOptions, ContentSize } from '$lib/utils/bulma.types.js';
	import { delClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let size: ContentSize | undefined = undefined;

	$: cls = delClass.cls({ opts, size });
</script>

<button class={cls} on:click />
