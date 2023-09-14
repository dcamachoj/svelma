<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let isWidescreen = false;
export let isFullHD = false;
export let isMaxDesktop = false;
export let isMaxWidescreen = false;
export let isFluid = false;
$:
  cls = bulmaHelper(bulma, [
    "container",
    {
      "is-widescreen": isWidescreen,
      "is-fullhd": isFullHD,
      "is-max-desktop": isMaxDesktop,
      "is-max-widescreen": isMaxWidescreen,
      "is-fluid": isFluid
    }
  ]);
</script>

<div class={cls}>
	<slot />
</div>
