<script>import { bulmaHelper } from "../../utils/bulma.js";
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let bulma = {};
export let id;
export let placeholder = void 0;
export let type = "text";
export let value;
export let color = void 0;
export let size = void 0;
export let isRounded = false;
export let isHovered = false;
export let isFocused = false;
export let isStatic = false;
export let readonly = void 0;
export let disabled = false;
$:
  cls = bulmaHelper(bulma, [
    "input",
    {
      [`is-${color}`]: color != void 0,
      [`is-${size}`]: size != void 0,
      "is-rounded": isRounded,
      "is-hovered": isHovered,
      "is-focused": isFocused,
      "is-static": isStatic
    }
  ]);
const handleInput = (e) => {
  const target = e.target;
  value = type === "number" ? +target.value : target.value;
  dispatch("value-changed", { name: id, value });
};
</script>

<input
	{id}
	name={id}
	{type}
	class={cls}
	{value}
	{placeholder}
	{disabled}
	{readonly}
	on:input={handleInput}
/>
