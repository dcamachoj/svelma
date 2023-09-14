<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "card-content");
</script>

<div class={cls}>
	<slot />
</div>
