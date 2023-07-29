<script>import { bulmaHelper } from "../../utils/bulma.js";
import Icon from "./Icon.svelte";
export let className = "";
export let helper = {};
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
export let target;
$:
  cls = bulmaHelper(helper, [
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
		{#if icon}
			<Icon {icon} className={{ 'pr-1': text }} />
		{/if}
		{#if text}
			<span>{text}</span>
		{/if}
		<slot />
	</a>
{:else}
	<buttton role="button" tabindex="-1" on:click class={cls} {...props}>
		{#if icon}
			<Icon {icon} className={{ 'pr-1': text }} />
		{/if}
		{#if text}
			<span>{text}</span>
		{/if}
		<slot />
	</buttton>
{/if}
