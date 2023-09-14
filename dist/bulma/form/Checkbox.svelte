<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let id;
export let checked;
export let disabled = false;
$:
  cls = bulmaHelper(bulma, "checkbox");
const handleInput = (e) => {
  const target = e.target;
  checked = target.checked;
  dispatch("value-changed", { name: id, value: checked });
};
</script>

<label class={cls} {disabled}>
	<input type="checkbox" {id} name={id} {checked} {disabled} on:change={handleInput} />
	<slot />
</label>
