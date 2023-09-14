<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Colors, FieldAlign } from '$lib/utils/bulma.js';
	import { classNames } from '$lib/utils/classnames.js';

	export let bulma: BulmaHelper = {};
	export let helpText: string | undefined;
	export let helpColor: Colors | undefined = undefined;
	export let addons: FieldAlign | undefined = undefined;
	export let grouped: FieldAlign | undefined = undefined;
	export let isGroupedMultiline: boolean = false;
	export let isHorizontal: boolean = false;

	$: cls = bulmaHelper(bulma, 'field');
	$: clsHelp = classNames('help', {
		[`is-${helpColor}`]: helpColor != undefined,
		'has-addons': addons === 'left',
		[`has-addons-${addons}`]: addons && addons !== 'left',
		'is-grouped': grouped === 'left',
		[`is-grouped-${grouped}`]: grouped && grouped != 'left',
		'is-grouped-multiline': grouped && isGroupedMultiline,
		'is-horizontal': isHorizontal
	});
</script>

<div class={cls}>
	<slot />
	{#if helpText}
		<p class={clsHelp}>{helpText}</p>
	{/if}
</div>
