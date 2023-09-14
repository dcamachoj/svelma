<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, Action, TabsAlign, TabsSize } from '$lib/utils/bulma.js';
	import IconText from '$lib/bulma/common/IconText.svelte';

	export let bulma: BulmaHelper = {};
	export let tabs: Action[];
	export let align: TabsAlign = 'left';
	export let size: TabsSize | undefined = undefined;
	export let isBoxed: boolean = false;
	export let isToggle: boolean = false;
	export let isToggleRounded: boolean = false;
	export let isFullWidth: boolean = false;

	$: cls = bulmaHelper(bulma, [
		'tabs',
		{
			[`is-${align}`]: align != 'left',
			[`is-${size}`]: size != undefined,
			'is-boxed': isBoxed,
			'is-toggled': isToggle,
			'is-toggled-rounded': isToggleRounded,
			'is-fullwidth': isFullWidth
		}
	]);
</script>

<div class={cls}>
	<ul>
		{#each tabs as tab (tab.name)}
			{#if tab.href}
				<li>
					<a href={tab.href} class:is-active={tab.isActive}>
						<IconText icon={tab.icon} text={tab.text} />
					</a>
				</li>
			{:else if tab.click}
				<li>
					<a href="/" class:is-active={tab.isActive} on:click|preventDefault={tab.click}>
						<IconText icon={tab.icon} text={tab.text} />
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</div>
