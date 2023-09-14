<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let id;
export let size = void 0;
$:
  cls = bulmaHelper(bulma, [
    "label",
    {
      [`is-${size}`]: size != void 0
    }
  ]);
</script>

<label class={cls} for={id}>
	<slot />
</label>
