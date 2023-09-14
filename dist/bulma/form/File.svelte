<script>import { bulmaHelper } from "../../utils/bulma.js";
import Icon from "../common/Icon.svelte";
export let bulma = {};
export let id;
export let icon = void 0;
export let accept = void 0;
export let color = void 0;
export let size = void 0;
export let check = void 0;
export let align = "left";
export let file;
export let hasName = false;
export let isRight = false;
export let isFullWidth = false;
export let isBoxed = false;
let files;
$:
  cls = bulmaHelper(bulma, [
    "file",
    {
      "has-name": file && hasName,
      "is-right": isRight,
      "is-full-width": isFullWidth,
      "is-boxed": isBoxed,
      [`is-${color}`]: color != void 0,
      [`is-${size}`]: size != void 0,
      [`is-${align}`]: align != "left"
    }
  ]);
$:
  files = file ? [file] : void 0;
$:
  disabled = !file || check == void 0 || !check({ filename: file.name, type: file.type, size: file.size });
function onUpload() {
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
  if (file) {
    onUpload();
  }
}
</script>

<div class={cls}>
	<label class="file-label">
		<input class="file-input" type="file" {id} name={id} {accept} bind:files on:change={onChange} />
		<span class="file-cta">
			{#if icon}
				<Icon {icon} iconClass="file-icon" />
			{/if}
			<span class="file-label">
				<slot />
			</span>
		</span>
		{#if file && hasName}
			<span class="file-name">
				{file.name}
			</span>
		{/if}
	</label>
</div>
