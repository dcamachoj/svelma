<script>import { bulmaHelper } from "../../utils/bulma.js";
import { classNames } from "../../utils/classnames.js";
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let bulma = {};
export let id;
export let options;
export let value;
export let color = void 0;
export let size = void 0;
export let disabled = false;
export let isMultiple = false;
export let isRounded = false;
export let isHovered = false;
export let isFocused = false;
$:
  cls = bulmaHelper(bulma, [
    "select",
    {
      "is-multiple": isMultiple,
      [`is-${color}`]: color != void 0,
      [`is-${size}`]: size != void 0,
      "is-rounded": isRounded
    }
  ]);
$:
  clsSelect = classNames({
    "is-hovered": isHovered,
    "is-focused": isFocused
  });
const handleInput = (e) => {
  const target = e.target;
  value = target.value;
  dispatch("value-changed", { name: id, value });
};
</script>

<div class={cls}>
	<select
		{id}
		name={id}
		class={clsSelect}
		{value}
		multiple={isMultiple}
		{disabled}
		on:change={handleInput}
	>
		{#each options as option}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>
</div>
