<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let checked;
$:
  cls = bulmaHelper(bulma, "panel-block");
</script>

<label class={cls}>
	<input type="checkbox" {checked} on:click />
	<slot />
</label>
