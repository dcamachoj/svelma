<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import DropdownTriggerButton from './DropdownTriggerButton.svelte';
	import { dropdownTriggerClass } from './dropdown.js';

	export let opts: BulmaOptions = {};
	export let id: string;
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;

	$: cls = dropdownTriggerClass.cls({ opts });
</script>

<div class={cls}>
	<slot {DropdownTriggerButton}>
		<DropdownTriggerButton {id} {icon} {text} on:click />
	</slot>
</div>
