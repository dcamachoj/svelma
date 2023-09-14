<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let isSelected = false;
export let isBordered = false;
export let isStriped = false;
export let isNarrow = false;
export let isHoverable = false;
export let isFullWidth = false;
$:
  cls = bulmaHelper(bulma, [
    "row",
    {
      "is-selected": isSelected,
      "is-bordered": isBordered,
      "is-striped": isStriped,
      "is-narrow": isNarrow,
      "is-hoverable": isHoverable,
      "is-fullwidth": isFullWidth
    }
  ]);
</script>

<tr class={cls}>
	<slot />
</tr>
