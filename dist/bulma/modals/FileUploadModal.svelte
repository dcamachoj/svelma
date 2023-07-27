<script>import { createEventDispatcher } from "svelte";
import { icons } from "../common/icons.js";
import ModalCard from "../common/ModalCard.svelte";
import Icon from "../common/Icon.svelte";
import Button from "../common/Button.svelte";
const dispatch = createEventDispatcher();
export let active;
export let header;
export let accept = void 0;
export let progress = void 0;
export let check = void 0;
let loading = false;
let files;
let file;
$:
  if (active)
    onOpen();
$:
  disabled = !file || check == void 0 || !check({ filename: file.name, type: file.type, size: file.size });
function onOpen() {
  loading = false;
  files = void 0;
  file = void 0;
}
function onUpload() {
  if (disabled)
    return;
  loading = true;
  const rd = new FileReader();
  rd.addEventListener("load", (e) => {
    const dataUrl = e.target?.result?.toString();
    if (!dataUrl)
      return;
    const fileItem = {
      filename: file.name,
      dataUrl,
      type: file.type,
      size: file.size
    };
    if (check != void 0 && !check(fileItem))
      return;
    dispatch("select", fileItem);
  });
  rd.readAsDataURL(file);
}
function onChange() {
  file = files?.length ? files[0] : void 0;
}
function onClose() {
  active = false;
}
</script>

<ModalCard {active} {header} on:close={onClose}>
	<div class="file">
		<label class="file-label">
			<input
				class="file-input"
				type="file"
				name="file"
				id="file"
				{accept}
				bind:files
				on:change={onChange}
			/>
			<span class="file-cta">
				<Icon icon={icons.upload} />
				<span class="file-label"> Elija un archivo</span>
			</span>
			{#if file}
				<span class="file-name">
					{file.name}
				</span>
			{/if}
		</label>
	</div>
	{#if $$slots.default}
		<div class="notification">
			<slot />
		</div>
	{/if}
	{#if file}
		<div class="notification {disabled ? 'is-warning' : ''}">
			<p>
				Tamaño Actual: {(file.size / 1024.0).toFixed(1)}Kb
			</p>
			<p>
				Tipo: {file.type}
			</p>
		</div>
	{/if}
	{#if progress != null && loading}
		<progress class="progress" value={progress} max="100">{progress}%</progress>
	{/if}
	<div slot="actions">
		<Button
			{loading}
			icon={icons.save}
			text="Guardar"
			color="primary"
			on:click={onUpload}
			{disabled}
		/>
		<Button {loading} icon={icons.cancel} text="Cancelar" on:click={onClose} />
	</div>
</ModalCard>
