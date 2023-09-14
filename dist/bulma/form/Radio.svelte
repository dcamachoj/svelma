<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let id;
export let name;
export let checked;
export let value;
export let disabled = false;
$:
  cls = bulmaHelper(bulma, "radio");
const handleInput = (e) => {
  const target = e.target;
  checked = target.checked;
  dispatch("value-changed", { name: id, value: checked });
};
</script>

<label class={cls} {disabled}>
	<input type="radio" {id} {name} {checked} {disabled} {value} on:change={handleInput} />
	<slot />
</label>
