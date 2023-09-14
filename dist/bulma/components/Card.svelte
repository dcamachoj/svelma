<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "card");
</script>

<div class={cls}>
	<slot />
</div>
