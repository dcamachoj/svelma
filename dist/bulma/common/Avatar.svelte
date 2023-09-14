<script>import { bulmaHelper } from "../../utils/bulma.js";
export let avatar;
export let className = "";
export let bulma = {};
export let size = 24;
const noImage = "/images/no-image.png";
let hasError = false;
$:
  cls = bulmaHelper(bulma, ["avatar", className]);
function onError() {
  hasError = true;
}
</script>

<img
	src={hasError || !avatar ? noImage : avatar}
	alt="Avatar"
	class={cls}
	style="width: {size}px; height: {size}px;"
	on:error={onError}
/>

<style>
	.avatar {
		vertical-align: middle;
		border-radius: 50%;
	}
</style>
