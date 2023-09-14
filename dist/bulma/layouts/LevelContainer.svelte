<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let isRight = false;
$:
  cls = bulmaHelper(bulma, isRight ? "level-right" : "level-left");
</script>

<div class={cls}>
	<slot />
</div>
