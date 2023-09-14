<script>import { bulmaHelper } from "../../utils/bulma.js";
import Icon from "../common/Icon.svelte";
export let bulma = {};
export let iconLeft = void 0;
export let iconRight = void 0;
export let isExpanded = false;
export let isLoading = false;
$:
  cls = bulmaHelper(bulma, [
    "control",
    {
      "has-icons-left": iconLeft != void 0,
      "has-icons-right": iconRight != void 0,
      "is-expanded": isExpanded,
      "is-loading": isLoading
    }
  ]);
</script>

<div class={cls}>
	<slot />
	{#if iconLeft}
		<Icon icon={iconLeft} iconClass="icon is-left is-small" />
	{/if}
	{#if iconRight}
		<Icon icon={iconRight} iconClass="icon is-right is-small" />
	{/if}
</div>
