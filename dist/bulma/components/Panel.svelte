<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let color = void 0;
$:
  cls = bulmaHelper(bulma, [
    "panel",
    {
      [`is-${color}`]: color != void 0
    }
  ]);
</script>

<div class={cls}>
	<slot />
</div>
