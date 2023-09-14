<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let isMobile = false;
$:
  cls = bulmaHelper(bulma, [
    "level",
    {
      "is-mobile": isMobile
    }
  ]);
</script>

<nav class={cls}>
	<slot />
</nav>
