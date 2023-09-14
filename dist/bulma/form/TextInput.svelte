<script>import { createEventDispatcher } from "svelte";
import { classnames } from "../../utils/classnames.js";
const dispatch = createEventDispatcher();
export let id;
export let label;
export let placeholder = void 0;
export let type = "text";
export let value;
export let valid = void 0;
export let action = void 0;
export let color = void 0;
export let size = void 0;
export let isRounded = false;
export let isLoading = false;
$:
  message = valid?.message || "";
$:
  clsInput = classnames("input", {
    [`is-${color}`]: color != void 0,
    [`is-${size}`]: size != void 0,
    "is-rounded": isRounded
  });
const handleInput = (e) => {
  const target = e.target;
  value = type === "number" ? +target.value : target.value;
  dispatch("value-changed", { name: id, value });
};
</script>

<div class="field">
	<label for={id} class="label">{label}</label>
	<div class="control" class:is-loading={isLoading}>
		{#if action}
			<input
				{id}
				name={id}
				class={clsInput}
				{type}
				{value}
				{placeholder}
				on:input={handleInput}
				use:action.use={value}
			/>
		{:else}
			<input {id} name={id} class={clsInput} {type} {value} {placeholder} on:input={handleInput} />
		{/if}
	</div>
	{#if message}
		<p class="help is-danger">{message}</p>
	{/if}
</div>
