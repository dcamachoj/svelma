<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "hero-foot");
</script>

<div class={cls}>
	<slot />
</div>
