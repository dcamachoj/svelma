<script lang="ts">
	import type { BulmaOptions } from '$lib/utils/bulma.types.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import { table } from './table.js';
	import {
		GridManager,
		type GridColumn,
		type GridFilter,
		type GridOptions,
		type GridRequest,
		type GridStats,
	} from './grid.js';
	import Icon from '../common/Icon.svelte';
	import {
		mdiFilter,
		mdiFilterCheck,
		mdiPageFirst,
		mdiPageLast,
		mdiPagePrevious,
		mdiPageNext,
		mdiSort,
		mdiSortAscending,
		mdiSortDescending,
	} from '@mdi/js';
	import { bulmaClassnames } from '$lib/utils/bulma.js';

	const dispatch = createEventDispatcher();

	export let opts: BulmaOptions = {};
	export let bordered: boolean = false;
	export let striped: boolean = false;
	export let narrow: boolean = false;
	export let hoverable: boolean = false;
	export let fullwidth: boolean = false;
	export let columns: GridColumn<any>[];
	export let rows: any[];
	export let stats: GridStats;
	export let request: GridRequest;
	export let options: GridOptions<any> = {};
	export let vMargin: number | undefined = undefined;

	let filterColumn: GridColumn<any> | undefined = undefined;
	let selectedFilter: GridFilter | undefined = undefined;

	let elHead: HTMLElement;
	let elFoot: HTMLElement;

	const gridManager = GridManager.getInstance();

	$: clsTable = table.cls({ opts, bordered, striped, narrow, hoverable, fullwidth });
	$: canFirst = stats.pageIndex > 0;
	$: canLast = stats.pageIndex < stats.pageCount - 1;
	$: tbodyStyle = `max-height: calc(100vh - 100px - ${vMargin || 0}px - ${elHead?.clientHeight || 0}px - ${elFoot?.clientHeight || 0}px);`;
	$: trHeaderStyle = options.headerHeight ? `height: ${options.headerHeight}px;` : '';
	$: trBodyStyle = options.bodyRowHeight ? `height: ${options.bodyRowHeight}px;` : '';

	onMount(() => {
		const filters: GridFilter[] = columns
			.filter((col) => !!col.filterOptions?.filter)
			.map((col) => ({
				value: '',
				type: col.filterOptions?.type,
				operator: col.filterOptions?.operators[0],
				field: col.field,
				...col.filterOptions?.filter,
			})) as GridFilter[];
		onPage({ filters });
	});

	function onSort(col: GridColumn<any>) {
		return () => {
			if (!col.field) return;
			const sort = { ...request.sort };
			if (sort.field && sort.field == col.field) {
				sort.asc = !sort.asc;
			} else {
				sort.field = col.field;
				sort.asc = col.sortAsc;
			}
			onPage({
				pageIndex: 0,
				sort,
			});
		};
	}
	function onFirst() {
		onPage({
			pageIndex: 0,
		});
	}
	function onLast() {
		onPage({
			pageIndex: stats.pageCount - 1,
		});
	}
	function onPrev() {
		onPage({
			pageIndex: Math.max(0, stats.pageIndex - 1),
		});
	}
	function onNext() {
		onPage({
			pageIndex: Math.min(stats.pageCount - 1, stats.pageIndex + 1),
		});
	}
	function onPage(req: Partial<GridRequest>) {
		dispatch('page', {
			...request,
			...req,
		});
	}
	function colHasFilter(col: GridColumn<any>, filters?: GridFilter[]) {
		if (!col.filter) return false;
		return (filters || []).some((f) => f.field == col.field);
	}
	function showFilter(col: GridColumn<any>) {
		return () => {
			if (!col.field || !col.filter || !col.filterOptions) return;
			selectedFilter = request.filters.find((f) => f.field == col.field) ?? {
				field: col.field,
				type: col.filterOptions.type,
				operator: col.filterOptions.operators[0],
				value: '',
				...(col.filterOptions.filter || {}),
			};
			filterColumn = col;
		};
	}
	function hideFilter() {
		selectedFilter = undefined;
		filterColumn = undefined;
	}
	function saveFilter(e: CustomEvent<GridFilter>) {
		const filter = e.detail;
		const filters = request.filters.filter((f) => gridManager.isValidFilter(f));
		if (!gridManager.isValidFilter(filter)) {
			onPage({ filters, pageIndex: 0 });
			return hideFilter();
		}
		const found = filters.find((f) => f.field == filterColumn!!.field);
		if (!found) {
			filters.push(filter!!);
		} else {
			found.operator = filter!!.operator;
			found.value = filter!!.value;
		}
		onPage({ filters, pageIndex: 0 });
		hideFilter();
	}
	function clearFilter() {
		if (selectedFilter) {
			selectedFilter.operator = 'eq';
			selectedFilter.value = '';
		}
		const filters = request.filters.filter((f) => gridManager.isValidFilter(f));
		onPage({ filters, pageIndex: 0 });
		hideFilter();
	}
</script>

<table class={clsTable}>
	<thead class={options.tHead} bind:this={elHead}>
		{#if $$slots.thead}
			<slot name="thead" />
		{/if}
		<tr class={options.headerRow} style={trHeaderStyle}>
			{#each columns as col (col.id)}
				<th
					class={gridManager.getColClass(col, options.headerCell)}
					style={gridManager.getColWidthStyle(col)}
				>
					<div class="fullwidth">
						{#if col.sortable}
							<button class="no-button" on:click={onSort(col)}>
								<Icon
									icon={request?.sort?.field == col.field
										? request?.sort?.asc === false
											? mdiSortDescending
											: mdiSortAscending
										: mdiSort}
								/>
							</button>
						{/if}
						<span class="grid-header"
							>{#if col.header}
								{col.header}
							{:else}
								&nbsp;
							{/if}
						</span>
						{#if col.filter}
							<button class="no-button" on:click={showFilter(col)}>
								{#if colHasFilter(col, request.filters)}
									<Icon icon={mdiFilterCheck} />
								{:else}
									<Icon icon={mdiFilter} />
								{/if}
							</button>
						{/if}
					</div>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class={options.tBody} style={tbodyStyle}>
		{#each rows as row}
			<tr class={gridManager.getRowClass(row, options.bodyRow)} style={trBodyStyle}>
				{#each columns as col (col.id)}
					<td
						class={gridManager.getCellClass(col, row, col.rendererOptions.classFn)}
						title={col.rendererOptions.tooltip ? col.rendererOptions.tooltip(col, row) : undefined}
						style={gridManager.getColWidthStyle(col)}
					>
						<svelte:component this={col.renderer} options={col.rendererOptions} {col} {row} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>

	{#if $$slots.tfoot || stats}
		<tfoot class={options.tFoot} bind:this={elFoot}>
			{#if $$slots.tfoot}
				<tr>
					<slot name="tfoot" />
				</tr>
			{/if}
			<tr>
				<td class={bulmaClassnames({ flexGrow: 1, flexShrink: 1 })}>
					<nav class="pagination is-centered" aria-label="pagination">
						<a
							href="/"
							class="pagination-previous"
							class:disabled={!canFirst}
							on:click|preventDefault={onFirst}
						>
							<Icon icon={mdiPageFirst} />
						</a>
						<a
							href="/"
							class="pagination-next"
							class:disabled={!canLast}
							on:click|preventDefault={onLast}
						>
							<Icon icon={mdiPageLast} />
						</a>
						<ul class="pagination-list">
							<li>
								<a
									href="/"
									class="pagination-link"
									class:disabled={!canFirst}
									on:click|preventDefault={onPrev}
								>
									<Icon icon={mdiPagePrevious} />
								</a>
							</li>
							<li>
								<a
									href="/{stats.pageIndex + 1}"
									class="pagination-link is-current"
									aria-label="Página {stats.pageIndex + 1}"
									aria-current="page"
									on:click|preventDefault
								>
									{stats.pageIndex + 1} / {stats.pageCount} : {stats.totalCount}
								</a>
							</li>
							<li>
								<a
									href="/"
									class="pagination-link"
									class:disabled={!canLast}
									on:click|preventDefault={onNext}
								>
									<Icon icon={mdiPageNext} />
								</a>
							</li>
						</ul>
					</nav>
				</td>
			</tr>
		</tfoot>
	{/if}
</table>

{#if filterColumn}
	<svelte:component
		this={filterColumn.filter}
		col={filterColumn}
		filter={selectedFilter}
		options={filterColumn.filterOptions}
		on:save={saveFilter}
		on:hide={hideFilter}
		on:clear={clearFilter}
	/>
{/if}

<style lang="less">
	table {
		width: 100%;
		height: 100%;
	}
	table,
	thead,
	tbody,
	tfoot {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	th > div {
		display: flex;
		flex-direction: row;
		.grid-header {
			flex: 1;
		}
	}
	tr {
		display: flex;
		flex-direction: row;
		align-items: stretch;
	}
	th,
	td {
		display: block;
	}
	tbody {
		flex: 1;
		overflow-y: auto;
	}
	.disabled {
		cursor: not-allowed;
	}
	.buttons.is-right {
		flex: 1;
		justify-content: end;
	}
	tbody > tr:hover {
		background-color: #ffffff10;
	}
</style>
