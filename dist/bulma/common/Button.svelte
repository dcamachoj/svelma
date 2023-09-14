<script>import { bulmaHelper } from "../../utils/bulma.js";
import Icon from "./Icon.svelte";
import IconText from "./IconText.svelte";
export let className = "";
export let bulma = {};
export let href = "";
export let icon = "";
export let text = "";
export let color = null;
export let light = false;
export let size = null;
export let responsive = false;
export let fullWidth = false;
export let outlined = false;
export let inverted = false;
export let rounded = false;
export let loading = false;
export let isStatic = false;
export let disabled = void 0;
export let target = void 0;
$:
  cls = bulmaHelper(bulma, [
    "button",
    className,
    {
      [`is-${color}`]: color,
      "is-light": light,
      [`is-${size}`]: size,
      "is-responsive": responsive,
      "is-fullwidth": fullWidth,
      "is-outlined": outlined,
      "is-inverted": inverted,
      "is-rounded": rounded,
      "is-loading": loading,
      "is-static": isStatic
    }
  ]);
$:
  props = {
    disabled: disabled || void 0
  };
</script>

{#if href}
	<a {href} class={cls} {target} {...props}>
		<IconText {icon} {text} />
		<slot />
	</a>
{:else}
	<buttton role="button" tabindex="-1" on:click class={cls} {...props}>
		<IconText {icon} {text} />
		<slot />
	</buttton>
{/if}
