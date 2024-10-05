<script lang="ts">
	import type { Colors, DarkColors, LightColors } from '$lib/utils/bulma.types.js';
	import { classnames } from '$lib/utils/classnames.js';
	import type { MenuAction } from '$lib/utils/stores.js';
	import MenuActionButton from './MenuActionButton.svelte';

	export let header: string;
	export let data: Record<string, string | number | undefined>;
	export let actionsL: MenuAction[] | undefined = undefined;
	export let actionsR: MenuAction[] | undefined = undefined;
	export let borderless: boolean | undefined = undefined;
	export let keyWidth: number = 0;
	export let backColor: Colors | LightColors | DarkColors | undefined = undefined;
	export let foreColor: Colors | LightColors | DarkColors | undefined = undefined;
	export let hasContent: boolean = false;

	$: cls = classnames('details', {
		[`has-background-${backColor}`]: backColor,
		[`has-text-${foreColor}`]: foreColor,
	});
	$: clsText = classnames({
		[`has-text-${foreColor}`]: foreColor,
	});
	$: dataFields = Object.entries(data)
		.map(([key, val]) => ({ key, val }))
		.filter(({ key, val }) => val != undefined);
	$: keyStyle = keyWidth ? `min-width: ${keyWidth}px;` : '';
</script>

<div class={cls} class:is-borderless={borderless}>
	<p class="data-title is-5 {clsText}">{header}</p>
	<div class="data-fields">
		{#each dataFields as field}
			<div class="data-field" class:is-horizontal={keyWidth}>
				<div class="data-key {clsText}" style={keyStyle}>{field.key}:</div>
				<div class="data-value {clsText}">{field.val}</div>
			</div>
		{/each}
	</div>
	{#if hasContent && $$slots.default}
		<div class="details-content">
			<slot />
		</div>
	{/if}
	{#if actionsL}
		<div class="actions is-left">
			{#each actionsL as action}
				<MenuActionButton {action} />
			{/each}
		</div>
	{/if}
	{#if actionsR}
		<div class="actions is-right">
			{#each actionsR as action}
				<MenuActionButton {action} />
			{/each}
		</div>
	{/if}
</div>

<style lang="less">
	.details {
		padding: 1rem;
		border: 1px solid lightgray;
		border-radius: 0.5rem;
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-rows: auto auto auto;
		grid-template-areas:
			'actionsL title   actionsR'
			'actionsL fields  actionsR'
			'actionsL content actionsR';
		column-gap: 0.5rem;
		width: 100%;

		&.is-borderless {
			padding: 0;
			border: none;
		}

		.data-title {
			grid-area: title;
			margin-bottom: 0;
			text-wrap: pretty;
			text-align: left;
		}
		.details-content {
			grid-area: content;
		}
		.data-fields {
			grid-area: fields;

			.data-field {
				display: flex;
				flex-direction: column;
				align-items: stretch;

				.data-key {
					font-weight: bold;
					text-align: left;
				}

				&.is-horizontal {
					flex-direction: row;

					.data-value {
						flex: 1;
					}
				}
			}
		}
		.actions {
			display: flex;
			flex-direction: column;
			align-items: start;
			justify-content: start;
		}
		.actions.is-left {
			grid-area: actionsL;
		}
		.actions.is-right {
			grid-area: actionsR;
		}

		.data-key {
			font-weight: bold;
		}
	}
</style>
