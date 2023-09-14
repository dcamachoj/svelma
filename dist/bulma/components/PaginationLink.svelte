<script>import { createEventDispatcher } from "svelte";
import { bulmaHelper } from "../../utils/bulma.js";
const dispatch = createEventDispatcher();
export let bulma = {};
export let page;
export let isCurrent = false;
$:
  cls = bulmaHelper(bulma, "box");
function onPage() {
  dispatch("page", page);
}
</script>

<li>
	<a
		href="/"
		class="pagination-link"
		class:is-current={isCurrent}
		aria-label="Goto page {page}"
		on:click|preventDefault={onPage}
	>
		{page}
	</a>
</li>
