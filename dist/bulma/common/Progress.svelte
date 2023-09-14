<script>import { bulmaHelper } from "../../utils/bulma.js";
export let bulma = {};
export let value;
export let max = 100;
export let min = 0;
export let indeterminate = false;
export let size = void 0;
export let color = void 0;
$:
  cls = bulmaHelper(bulma, [
    "progress",
    {
      [`is-${size}`]: size != void 0,
      [`is-${color}`]: color != void 0
    }
  ]);
</script>

{#if !indeterminate}
	<progress class={cls} {value} {max} {min}
		><slot>
			{value.toFixed(0)}%
		</slot>
	</progress>
{:else}
	<progress class={cls}><slot /></progress>
{/if}
