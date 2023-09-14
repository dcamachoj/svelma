<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper } from '$lib/utils/bulma.js';

	export let bulma: BulmaHelper = {};
	export let id: string;
	export let name: string;
	export let checked: boolean;
	export let value: string;
	export let disabled: boolean = false;

	$: cls = bulmaHelper(bulma, 'radio');

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		checked = target.checked;
		dispatch('value-changed', { name: id, value: checked });
	};
</script>

<label class={cls} {disabled}>
	<input type="radio" {id} {name} {checked} {disabled} {value} on:change={handleInput} />
	<slot />
</label>
