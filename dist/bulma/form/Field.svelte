<script>import { bulmaHelper } from "../../utils/bulma.js";
import { classNames } from "../../utils/classnames.js";
export let bulma = {};
export let helpText;
export let helpColor = void 0;
export let addons = void 0;
export let grouped = void 0;
export let isGroupedMultiline = false;
export let isHorizontal = false;
$:
  cls = bulmaHelper(bulma, "field");
$:
  clsHelp = classNames("help", {
    [`is-${helpColor}`]: helpColor != void 0,
    "has-addons": addons === "left",
    [`has-addons-${addons}`]: addons && addons !== "left",
    "is-grouped": grouped === "left",
    [`is-grouped-${grouped}`]: grouped && grouped != "left",
    "is-grouped-multiline": grouped && isGroupedMultiline,
    "is-horizontal": isHorizontal
  });
</script>

<div class={cls}>
	<slot />
	{#if helpText}
		<p class={clsHelp}>{helpText}</p>
	{/if}
</div>
