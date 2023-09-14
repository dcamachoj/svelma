<script>import { bulmaHelper } from "../../utils/bulma.js";
import IconText from "../common/IconText.svelte";
export let bulma = {};
export let tabs;
$:
  cls = bulmaHelper(bulma, "panel-tabs");
</script>

<p class={cls}>
	{#each tabs as tab (tab.name)}
		{#if tab.href}
			<a href={tab.href} class:is-active={tab.isActive}>
				<IconText icon={tab.icon} text={tab.text} />
			</a>
		{:else if tab.click}
			<a href="/" class:is-active={tab.isActive} on:click|preventDefault={tab.click}>
				<IconText icon={tab.icon} text={tab.text} />
			</a>
		{/if}
	{/each}
</p>
