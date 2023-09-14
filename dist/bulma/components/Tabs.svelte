<script>import { bulmaHelper } from "../../utils/bulma.js";
import IconText from "../common/IconText.svelte";
export let bulma = {};
export let tabs;
export let align = "left";
export let size = void 0;
export let isBoxed = false;
export let isToggle = false;
export let isToggleRounded = false;
export let isFullWidth = false;
$:
  cls = bulmaHelper(bulma, [
    "tabs",
    {
      [`is-${align}`]: align != "left",
      [`is-${size}`]: size != void 0,
      "is-boxed": isBoxed,
      "is-toggled": isToggle,
      "is-toggled-rounded": isToggleRounded,
      "is-fullwidth": isFullWidth
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
