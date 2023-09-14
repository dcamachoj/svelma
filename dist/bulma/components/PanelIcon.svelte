<script>import { bulmaHelper } from "../../utils/bulma.js";
import Icon from "../common/Icon.svelte";
export let bulma = {};
export let icon;
$:
  cls = bulmaHelper(bulma, "panel-icon");
</script>

<Icon {icon} iconClass={cls} />
