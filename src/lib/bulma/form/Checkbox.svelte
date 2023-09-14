<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let id: string;
	export let checked: boolean;
	export let disabled: boolean = false;

	$: cls = bulmaHelper(bulma, 'checkbox');

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		checked = target.checked;
		dispatch('value-changed', { name: id, value: checked });
	};
</script>

<label class={cls} {disabled}>
	<input type="checkbox" {id} name={id} {checked} {disabled} on:change={handleInput} />
	<slot />
</label>
