<script>import { bulmaHelper } from "../../utils/bulma.js";
import Icon from "../common/Icon.svelte";
export let bulma = {};
export let isTitleCentered = false;
export let header = void 0;
export let buttonIcon = void 0;
$:
  cls = bulmaHelper(bulma, "card-header");
</script>

<header class={cls}>
	<div class="card-header-title" class:is-centered={isTitleCentered}>
		{#if header}
			{header}
		{/if}
		<slot />
		{#if $$slots.button || buttonIcon}
			<button class="card-header-icon" on:click>
				{#if buttonIcon}
					<Icon icon={buttonIcon} />
				{/if}
				{#if $$slots.button}
					<slot name="button" />
				{/if}
			</button>
		{/if}
	</div>
</header>
