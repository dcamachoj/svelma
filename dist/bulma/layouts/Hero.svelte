<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let color = void 0;
export let size = void 0;
export let isFullHeightWithNavbar = false;
$:
  cls = bulmaHelper(bulma, [
    "hero",
    {
      [`is-${color}`]: color != void 0,
      [`is-${size}`]: size != void 0,
      "is-fullheight-with-navbar": isFullHeightWithNavbar
    }
  ]);
</script>

<section class={cls}>
	<slot />
</section>
