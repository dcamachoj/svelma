<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type { BulmaHelper, MenuLabel, MenuItem, Action } from '$lib/utils/bulma.js';
	import IconText from '$lib/bulma/common/IconText.svelte';

	export let bulma: BulmaHelper = {};
	export let items: MenuLabel[];

	$: cls = bulmaHelper(bulma, 'menu');
</script>

<aside class={cls}>
	{#each items as label (label.name)}
		<p class="menu-label">
			<IconText icon={label.icon} text={label.text} />
		</p>
		{#if label.children?.length}
			<ul class="menu-list">
				{#each label.children || [] as item}
					<li>
						{#if item.href}
							<a href={item.action.href} class:is-active={item.action.isActive}>
								<IconText icon={item.action.icon} text={item.action.text} />
							</a>
						{:else if item.action.click}
							<a
								href="/"
								on:click|preventDefault={item.action.click}
								class:is-active={item.action.isActive}
							>
								<IconText icon={item.action.icon} text={item.action.text} />
							</a>
						{/if}
						{#if item.children?.length}
							<ul>
								{#each item.children || [] as action}
									<li>
										{#if action.href}
											<a href={action.href} class:is-active={action.isActive}>
												<IconText icon={action.icon} text={action.text} />
											</a>
										{:else if action.click}
											<a
												href="/"
												on:click|preventDefault={action.click}
												class:is-active={action.isActive}
											>
												<IconText icon={action.icon} text={action.text} />
											</a>
										{/if}
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
