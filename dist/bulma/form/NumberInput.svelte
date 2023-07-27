<script>import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
export let id;
export let label;
export let placeholder = void 0;
export let value;
export let step = void 0;
export let valid = void 0;
export let action = void 0;
$:
  message = valid?.message || "";
const handleInput = (e) => {
  const target = e.target;
  value = +target.value;
  dispatch("value-changed", { name: id, value });
};
</script>

<div class="field">
	<label for={id} class="label">{label}</label>
	<div class="control">
		{#if action}
			<input
				{id}
				name={id}
				class="input"
				type="number"
				{value}
				{placeholder}
				{step}
				on:input={handleInput}
				use:action.use={value}
			/>
		{:else}
			<input
				{id}
				name={id}
				class="input"
				type="number"
				{value}
				{placeholder}
				{step}
				on:input={handleInput}
			/>
		{/if}
	</div>
	{#if message}
		<p class="help is-danger">{message}</p>
	{/if}
</div>
