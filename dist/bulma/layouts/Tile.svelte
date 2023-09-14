<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let className = "";
export let size = void 0;
export let isAncestor = false;
export let isParent = false;
export let isChild = false;
export let isVertical = false;
$:
  cls = bulmaHelper(bulma, [
    "tile",
    className,
    {
      [`is-${size}`]: size != void 0,
      "is-ancestor": isAncestor,
      "if-parent": isParent,
      "is-child": isChild,
      "is-vertical": isVertical
    }
  ]);
</script>

<div class={cls}>
	<slot />
</div>
