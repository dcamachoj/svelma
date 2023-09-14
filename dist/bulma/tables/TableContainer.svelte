<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "table-container");
</script>

<div class={cls}>
	<slot />
</div>
