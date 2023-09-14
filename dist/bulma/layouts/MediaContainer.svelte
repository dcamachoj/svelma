<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let align = void 0;
$:
  cls = bulmaHelper(bulma, align ? `media-${align}` : "media-content");
</script>

<div class={cls}>
	<slot />
</div>
