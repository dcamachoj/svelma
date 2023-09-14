<script>import { bulmaHelper } from "../../utils/bulma.js";
import IconText from "../common/IconText.svelte";
import Delete from "../common/Delete.svelte";
export let bulma = {};
export let icon = void 0;
export let text = void 0;
export let color = void 0;
export let size = void 0;
$:
  cls = bulmaHelper(bulma, [
    "message",
    {
      [`is-${color}`]: color != void 0,
      [`is-${size}`]: size != void 0
    }
  ]);
</script>

<article class={cls}>
	{#if icon || text}
		<div class="message-header">
			<IconText {icon} {text} />
			<Delete on:click />
		</div>
	{/if}
	<div class="message-body">
		<slot />
	</div>
</article>
