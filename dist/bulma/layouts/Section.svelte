<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let size = void 0;
$:
  cls = bulmaHelper(bulma, [
    "section",
    {
      [`is-${size}`]: size != void 0
    }
  ]);
</script>

<section class={cls}>
	<slot />
</section>
