<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let color = void 0;
export let hasDelete = false;
export let isLight = false;
$:
  cls = bulmaHelper(bulma, [
    "notification",
    {
      [`is-${color}`]: color != void 0,
      "is-light": isLight
    }
  ]);
</script>

<div class={cls}>
	{#if hasDelete}
		<button class="delete" on:click />
	{/if}
	<slot />
</div>
