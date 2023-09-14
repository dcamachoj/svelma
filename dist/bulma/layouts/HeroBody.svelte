<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "hero-body");
</script>

<div class={cls}>
	<slot />
</div>
