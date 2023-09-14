<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "card-image");
</script>

<div class={cls}>
	<slot />
</div>
