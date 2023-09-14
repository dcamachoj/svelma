<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let imgSrc;
export let imgAlt = "image";
export let size = void 0;
export let isRounded = false;
$:
  cls = bulmaHelper(bulma, [
    "image",
    {
      [`is-${size}`]: size != void 0,
      "is-rounded": isRounded
    }
  ]);
</script>

<figure class={cls}>
	{#if imgSrc}
		<img alt={imgAlt} src={imgSrc} />
	{/if}
	<slot />
</figure>
