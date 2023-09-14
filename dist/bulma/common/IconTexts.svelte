<script>import { bulmaHelper } from "../../utils/bulma.js";
export let icons;
export let className = "";
export let bulma = {};
export let block = false;
$:
  cls = bulmaHelper(bulma, [className, { block }]);
</script>

<span class="icon-text {cls}">
	{#each icons as i}
		<span class="icon">
			<svg style="width:24px;height:24px" viewBox="0 0 24 24">
				<path fill="currentColor" d={i.icon} />
			</svg>
		</span>
		<span>{i.text}</span>
	{/each}
</span>

<style>
	.icon-text.block {
		display: block;
	}
</style>
