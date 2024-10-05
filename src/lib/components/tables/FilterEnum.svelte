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
	import type { Option } from '$lib/utils/bulma.types.js';

	const dispatch = createEventDispatcher();

	export let col: GridColumn<any>;
	export let filter: GridFilter;
	export let options: GridFilterOptions;

	let operator: GridFilterOperator;
	let value: string;
	let values: string[] = [];

	onMount(() => {
		operator = filter.operator;
		value = filter.value;
		values = filter.value.split(',');
	});

	function hideFilter() {
		dispatch('hide');
	}
	function clearFilter() {
		dispatch('clear');
	}
	function saveFilter() {
		value = values.filter(Boolean).join(',');
		const res: GridFilter = {
			type: filter.type,
			field: filter.field,
			operator,
			value,
		};
		if (options.validator && !options.validator(res)) return;
		dispatch('save', res);
	}
	function onSelect(option: Option) {
		return () => {
			const checked = values.indexOf(option.value) >= 0;
			if (options.multiple) {
				if (checked) {
					values = values.filter((v) => v != option.value);
				} else {
					values = [...values, option.value];
				}
			} else {
				values = checked ? [] : [option.value];
			}
		};
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
	<div class="field">
		<label class="label" for="value">Valor</label>
		<div class="control">
			<div class="buttons">
				{#each options.options || [] as option}
					<button
						class="button"
						class:is-info={values.indexOf(option.value) >= 0}
						on:click={onSelect(option)}
					>
						{option.text}
					</button>
				{/each}
			</div>
		</div>
	</div>
</FilterModal>
