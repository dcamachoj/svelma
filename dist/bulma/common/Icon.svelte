<script>import { bulmaHelper } from "../../utils/bulma.js";
import { icons } from "./icons.js";
export let icon;
export let iconClass = "icon";
export let className = "";
export let helper = {};
$:
  cls = bulmaHelper(helper, [iconClass, className]);
$:
  iconData = icon || icons.noImage;
</script>

<span class={cls}>
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="currentColor" d={iconData} />
	</svg>
</span>
