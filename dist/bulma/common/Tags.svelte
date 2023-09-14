<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let hasAddons = false;
$:
  cls = bulmaHelper(bulma, [
    "tags",
    {
      "has-addons": hasAddons
    }
  ]);
</script>

<div class={cls}>
	<slot />
</div>
