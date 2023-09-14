<script>import { createEventDispatcher } from "svelte";
import { bulmaHelper } from "../../utils/bulma.js";
import IconText from "../common/IconText.svelte";
import PaginationLink from "./PaginationLink.svelte";
const dispatch = createEventDispatcher();
export let bulma = {};
export let pages;
export let prevIcon = void 0;
export let prevText = void 0;
export let prevPages = [];
export let nextIcon = void 0;
export let nextText = void 0;
export let nextPages = [];
export let current = void 0;
export let align = "left";
export let isRounded = false;
export let size = void 0;
$:
  cls = bulmaHelper(bulma, [
    "pagination",
    {
      [`is-${align}`]: align != "left",
      "is-rounded": isRounded,
      [`is-${size}`]: size != void 0
    }
  ]);
function onPage(page) {
  return () => {
    dispatch("page", page);
  };
}
function onLink(e) {
  dispatch("page", e.details);
}
</script>

<nav class={cls} aria-label="pagination">
	{#if prevIcon || prevText}
		<a href="/" class="pagination-previous" on:click|preventDefault={onPage('prev')}>
			<IconText icon={prevIcon} text={prevText} />
		</a>
	{/if}
	{#if nextIcon || nextText}
		<a href="/" class="pagination-next" on:click|preventDefault={onPage('prev')}>
			<IconText icon={nextIcon} text={nextText} />
		</a>
	{/if}
	<ul class="pagination-list">
		{#if prevPages.length}
			{#each prevPages as page}
				<PaginationLink {page} on:page={onLink} />
			{/each}
			<li>
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
		{/if}
		{#each pages as page}
			<PaginationLink {page} isCurrent={page === current} on:page={onLink} />
		{/each}
		{#if nextPages.length}
			<li>
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			{#each nextPages as page}
				<PaginationLink {page} on:page={onLink} />
			{/each}
		{/if}
	</ul>
</nav>
