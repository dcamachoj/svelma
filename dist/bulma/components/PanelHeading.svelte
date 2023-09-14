<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "panel-heading");
</script>

<div class={cls}>
	<slot />
</div>
