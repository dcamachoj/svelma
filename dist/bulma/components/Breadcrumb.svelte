<script>import { bulmaHelper } from "../../utils/bulma.js";
import IconText from "../common/IconText.svelte";
export let bulma = {};
export let items;
export let active = void 0;
export let isCentered = false;
export let isRight = false;
export let separator = void 0;
export let size = void 0;
$:
  cls = bulmaHelper(bulma, [
    "breadcrumb",
    {
      "is-centered": isCentered,
      "is-right": isRight,
      [`is-${separator}-separator`]: separator != void 0,
      [`is-${size}`]: size != void 0
    }
  ]);
</script>

<nav class={cls} aria-label="breadcrumbs">
	<ul>
		{#each items as item (item.name)}
			<li class:is-active={active == item.name}>
				{#if item.href}
					<a href={item.href}> <IconText icon={item.icon} text={item.text} /></a>
				{:else if item.click}
					<a href="/" on:click|preventDefault={item.click}>
						<IconText icon={item.icon} text={item.text} />
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
