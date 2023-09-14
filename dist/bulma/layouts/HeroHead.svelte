<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "hero-head");
</script>

<div class={cls}>
	<slot />
</div>
