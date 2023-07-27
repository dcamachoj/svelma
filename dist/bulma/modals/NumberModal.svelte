<script>import { createEventDispatcher } from "svelte";
import { icons } from "../common/icons.js";
import Button from "../common/Button.svelte";
import ModalCard from "../common/ModalCard.svelte";
const dispatch = createEventDispatcher();
export let id;
export let active;
export let header;
export let label;
export let value;
export let step = void 0;
export let valid = void 0;
export let action = void 0;
export let okLabel = "Guardar";
export let okIcon = "save";
export let clrLabel = "";
export let clrIcon = "trash";
let loading = false;
$:
  if (active)
    onOpen();
$:
  isValid = valid == void 0 || valid.valid;
$:
  isDirty = valid == void 0 || valid.dirty;
$:
  message = valid?.message || "";
function onOpen() {
  loading = false;
}
function onClose() {
  active = false;
}
function onClear() {
  dispatch("clear", null);
}
function onSave() {
  if (!isValid || !isDirty)
    return;
  loading = true;
  dispatch("accept");
}
const handleInput = (e) => {
  const target = e.target;
  value = +target.value;
  dispatch("value-changed", { name: id, value });
};
</script>

<ModalCard {active} {header}>
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
					{step}
					on:input={handleInput}
					use:action.use={value}
				/>
			{:else}
				<input {id} name={id} class="input" type="number" {value} on:input={handleInput} {step} />
			{/if}
		</div>
		{#if message}
			<p class="help is-danger">{message}</p>
		{/if}
	</div>
	<div slot="actions">
		<Button
			{loading}
			disabled={!isValid || !isDirty}
			icon={icons[okIcon]}
			text={okLabel}
			color="primary"
			on:click={onSave}
		/>
		{#if clrLabel}
			<Button {loading} icon={icons[clrIcon]} text={clrLabel} color="info" on:click={onClear} />
		{/if}
		<Button {loading} icon={icons.cancel} text="Cancelar" on:click={onClose} />
	</div>
</ModalCard>
