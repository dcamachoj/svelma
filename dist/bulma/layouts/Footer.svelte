<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "footer");
</script>

<footer class={cls}>
	<slot />
</footer>
