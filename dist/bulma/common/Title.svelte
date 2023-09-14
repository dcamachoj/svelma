<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let subtitle = false;
export let size = void 0;
$:
  cls = bulmaHelper(bulma, [
    subtitle ? "subtitle" : "title",
    {
      [`is-${size}`]: size != void 0
    }
  ]);
</script>

<p class={cls}>
	<slot />
</p>
