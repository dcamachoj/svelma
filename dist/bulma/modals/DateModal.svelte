<script>import { createEventDispatcher } from "svelte";
import { icons } from "../common/icons.js";
import { logger } from "../../utils/logger.js";
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
let sValue;
$:
  if (active)
    onOpen();
$:
  isValid = valid == void 0 || valid.valid;
$:
  isDirty = valid == void 0 || valid.dirty;
$:
  message = valid?.message || "";
$:
  stepNumber = +(step || 0);
function toDate(src) {
  try {
    const date = new Date(src);
    const res = new Date(date.getTime() + 6e4 * date.getTimezoneOffset());
    logger.debug("DateModal.toDate", { src, res });
    return res;
  } catch (err) {
    return value;
  }
}
function fromDate(src) {
  try {
    const now = /* @__PURE__ */ new Date();
    const res = (src || now).toISOString().split("T")[0];
    logger.debug("DateModal.fromDate", { src, res });
    return res;
  } catch (err) {
    return sValue;
  }
}
function onOpen() {
  loading = false;
  sValue = fromDate(value);
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
  value = toDate(sValue);
  loading = true;
  dispatch("accept");
}
function onStep() {
  if (!value)
    return;
  const dd = value.getDay();
  const mm = value.getMonth();
  const yy = value.getFullYear() - stepNumber;
  value = new Date(yy, mm, dd);
  sValue = fromDate(value);
}
const handleInput = (e) => {
  const target = e.target;
  value = toDate(target.value);
  sValue = fromDate(value);
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
					type="date"
					value={sValue}
					on:input={handleInput}
					use:action.use={value}
				/>
			{:else}
				<input
					{id}
					name={id}
					class="input"
					type="date"
					value={sValue}
					on:input={handleInput}
					{step}
				/>
			{/if}
		</div>
		{#if message}
			<p class="help is-danger">{message}</p>
		{/if}
	</div>
	<div slot="actions">
		{#if step}
			<Button {loading} icon={icons.add} text="{stepNumber} años" on:click={onStep} />
		{/if}
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
