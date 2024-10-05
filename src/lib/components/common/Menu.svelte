<script lang="ts">
	import { bulmaClassnames } from '$lib/utils/bulma.js';
	import type { BulmaOptions, MenuLabelItem } from '$lib/utils/bulma.types.js';
	import MenuLabel from './MenuLabel.svelte';
	import MenuListItem from './MenuListItem.svelte';

	export let bulma: BulmaOptions = {};
	export let items: MenuLabelItem[];

	$: cls = bulmaClassnames(bulma, ['menu']);
</script>

<aside class={cls}>
	{#each items as label (label.name)}
		<slot name="label" {label} {MenuLabel}>
			<MenuLabel icon={label.icon} text={label.text} />
		</slot>
		{#if label.children?.length}
			<ul class="menu-list">
				{#each label.children || [] as item}
					<li>
						<slot action={item.action} {MenuListItem}>
							<MenuListItem {...item.action} />
						</slot>

						{#if item.children?.length}
							<ul>
								{#each item.children || [] as action}
									<li>
										<slot {action} {MenuListItem}>
											<MenuListItem {...action} />
										</slot>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	{/each}
</aside>
