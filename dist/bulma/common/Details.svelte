<script>import { bulmaHelper } from "../../utils/bulma.js";
export let title;
export let value;
export let bulma = {};
export let bulmaTitle = {};
export let bulmaSubtitle = {};
export let underlined = false;
const cls = bulmaHelper(bulma, [
  {
    flexDir: "column",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  "details full-width",
  { underlined }
]);
</script>

<div class={cls}>
	<p class="title {bulmaHelper(bulmaTitle, { textSize: '5' })}">{title}</p>
	<p class="subtitle {bulmaHelper(bulmaSubtitle, { textSize: '6' })}">{value}</p>
</div>

<style>
	.details.underlined {
		border-bottom: 1px solid black;
	}
	.title,
	.subtitle {
		text-align: left;
	}
</style>
