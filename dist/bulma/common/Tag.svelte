<script>import { bulmaHelper } from "../../utils/bulma.js";
import Delete from "./Delete.svelte";
export let bulma = {};
export let color = void 0;
export let size = void 0;
export let isRounded = false;
export let hasDelete = false;
export let deleteSize = void 0;
$:
  cls = bulmaHelper(bulma, [
    "tag",
    {
      [`is-${color}`]: color != void 0,
      [`is-${size}`]: size != void 0,
      "is-rounded": isRounded
    }
  ]);
</script>

<span class={cls}>
	<slot />
	{#if hasDelete}
		<Delete size={deleteSize} />
	{/if}
</span>
