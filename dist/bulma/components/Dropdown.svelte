<script>import { bulmaHelper } from "../../utils/bulma.js";
import { icons } from "../common/icons.js";
import IconText from "../common/IconText.svelte";
export let bulma = {};
export let id;
export let items;
export let triggerText = void 0;
export let triggerIcon = icons.chevronDown;
export let isActive = false;
export let isHoverable = false;
export let isRight = false;
export let isUp = false;
$:
  cls = bulmaHelper(bulma, [
    "dropdown",
    {
      "is-active": isActive,
      "is-hoverable": isHoverable,
      "is-right": isRight,
      "is-up": isUp
    }
  ]);
</script>

<div class={cls}>
	<div class="dropdown-trigger">
		<button class="button" aria-haspopup="true" aria-controls={id}>
			<IconText icon={triggerIcon} text={triggerText} />
		</button>
	</div>
	<div class="dropdown-menu" {id} role="menu">
		<div class="dropdown-content">
			{#each items as item (item.name)}
				{#if item.text === '-'}
					<hr class="dropdown-divider" />
				{:else if item.href}
					<a href={item.href} class="dropdown-item" class:is-active={item.isActive}>
						<IconText icon={item.icon} text={item.text} />
					</a>
				{:else if item.click}
					<a
						href="/"
						class="dropdown-item"
						class:is-active={item.isActive}
						on:click|preventDefault={item.click}
					>
						<IconText icon={item.icon} text={item.text} />
					</a>
				{:else}
					<div class="dropdown-item" class:is-active={item.isActive}>
						<IconText icon={item.icon} text={item.text} />
					</div>
				{/if}
			{/each}
			<slot />
		</div>
	</div>
</div>
