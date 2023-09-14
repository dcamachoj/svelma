<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
$:
  cls = bulmaHelper(bulma, "media");
</script>

<article class={cls}>
	<slot />
</article>
