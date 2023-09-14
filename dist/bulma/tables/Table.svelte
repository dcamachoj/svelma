<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "table");
</script>

<table class={cls}>
	<slot />
</table>
