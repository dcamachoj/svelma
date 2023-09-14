<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let type = void 0;
$:
  cls = bulmaHelper(bulma, [
    "box",
    {
      [`is-${type}`]: type != void 0
    }
  ]);
</script>

<div class={cls}>
	<slot />
</div>
