<script lang="ts">
	import { bulmaClassnames } from '$lib/utils/bulma.js';
	import type { Action, BulmaOptions } from '$lib/utils/bulma.types.js';
	import { mdiChevronDown } from '@mdi/js';
	import IconText from './IconText.svelte';
	import { dropdownClass } from './dropdown.js';
	import DropdownTrigger from './DropdownTrigger.svelte';

	export let opts: BulmaOptions = {};
	export let id: string;
	export let items: Action[] = [];
	export let triggerText: string | undefined = undefined;
	export let triggerIcon: string | undefined = mdiChevronDown;
	export let active: boolean = false;
	export let hoverable: boolean = false;
	export let right: boolean = false;
	export let up: boolean = false;

	$: cls = dropdownClass.cls({ opts, active, hoverable, right, up });
</script>

<div class={cls}>
	<slot name="trigger" {DropdownTrigger}>
		<DropdownTrigger {id} icon={triggerIcon} text={triggerText} />
	</slot>
	<div class="dropdown-menu" {id} role="menu">
		<div class="dropdown-content">
			<slot>
				{#each items as item (item.name)}
					{#if item.text === '-'}
						<hr class="dropdown-divider" />
					{:else if item.href}
						<a href={item.href} class="dropdown-item" class:is-active={item.active}>
							<IconText icon={item.icon} text={item.text} />
						</a>
					{:else if item.click}
						<a
							href="/"
							class="dropdown-item"
							class:is-active={item.active}
							on:click|preventDefault={item.click}
						>
							<IconText icon={item.icon} text={item.text} />
						</a>
					{:else}
						<div class="dropdown-item" class:is-active={item.active}>
							<IconText icon={item.icon} text={item.text} />
						</div>
					{/if}
				{/each}
			</slot>
		</div>
	</div>
</div>
