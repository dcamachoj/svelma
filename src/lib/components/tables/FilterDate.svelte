<script lang="ts">
	import {
		gridFilterNames,
		type GridColumn,
		type GridFilter,
		type GridFilterOperator,
		type GridFilterOptions,
	} from './grid.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import FilterModal from './FilterModal.svelte';

	const dispatch = createEventDispatcher();
	const dateFormats: Record<string, string> = {
		date: 'yyyy-mm-dd',
		time: 'HH:MM:ss',
		datetime: 'yyyy-mm-dd HH:MM:ss',
	};

	export let col: GridColumn<any>;
	export let filter: GridFilter;
	export let options: GridFilterOptions;

	let operator: GridFilterOperator;
	let value: string = '';
	let value2: string = '';

	onMount(() => {
		operator = filter.operator;
		value = filter.value;
		if (operator == 'between') {
			const values = value.split(',');
			value = values[0];
			value2 = values[1] || '';
		}
	});

	$: needsValue = ['null', 'not_null'].indexOf(operator) == -1;
	$: needsValue2 = operator == 'between';

	function hideFilter() {
		dispatch('hide');
	}
	function clearFilter() {
		dispatch('clear');
	}
	function saveFilter() {
		const res: GridFilter = {
			type: filter.type,
			field: filter.field,
			operator,
			value: needsValue2 ? [value, value2].join(',') : value,
		};
		if (options.validator && !options.validator(res)) return;
		dispatch('save', res);
	}
</script>

<FilterModal header={col.header} on:hide={hideFilter} on:clear={clearFilter} on:save={saveFilter}>
	<div class="field">
		<label class="label" for="operator">Operador</label>
		<div class="control">
			<div class="select">
				<select id="operator" bind:value={operator}>
					{#each options.operators as operator}
						<option value={operator}>{gridFilterNames[operator]}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
	{#if needsValue}
		<div class="field">
			<label class="label" for="value">
				{#if operator == 'between'}
					Desde [{dateFormats[filter.type]}]
				{:else}
					Valor [{dateFormats[filter.type]}]
				{/if}
			</label>
			<div class="control">
				{#if filter.type == 'date'}
					<input id="value" class="input" type="date" bind:value />
				{:else if filter.type == 'time'}
					<input id="value" class="input" type="time" bind:value />
				{:else if filter.type == 'datetime'}
					<input id="value" class="input" type="datetime" bind:value />
				{/if}
			</div>
		</div>
	{/if}
	{#if needsValue2}
		<div class="field">
			<label class="label" for="value2"> Hasta [{dateFormats[filter.type]}]</label>
			<div class="control">
				{#if filter.type == 'date'}
					<input id="value2" class="input" type="date" bind:value={value2} />
				{:else if filter.type == 'time'}
					<input id="value2" class="input" type="time" bind:value={value2} />
				{:else if filter.type == 'datetime'}
					<input id="value2" class="input" type="datetime" bind:value={value2} />
				{/if}
			</div>
		</div>
	{/if}
</FilterModal>
