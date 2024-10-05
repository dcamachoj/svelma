import type { ButtonColor, ButtonSize, Option } from '$lib/utils/bulma.types.js';
import { DialogOptions } from '$lib/utils/dialog-options.js';
import { EnvPublic } from '$lib/utils/env.js';
import type { URLSearchValues } from '$lib/utils/fetch.js';
import { injectable } from '$lib/utils/injectable.js';
import { writable, type Writable } from 'svelte/store';

export type GridFilterStringOperator = 'like' | 'not_like' | 'in' | 'not_in' | 'eq' | 'ne';
export type GridFilterComparableOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'between';
export type GridFilterNullOperator = 'null' | 'not_null';
export type GridFilterOperator =
	| GridFilterStringOperator
	| GridFilterComparableOperator
	| GridFilterNullOperator;
export type GridFilterType = 'string' | 'number' | 'date' | 'time' | 'datetime';

export const gridFilterStringOperators: GridFilterStringOperator[] = [
	'like',
	'not_like',
	'in',
	'not_in',
	'eq',
	'ne',
];
export const gridFilterComparableOperator: GridFilterComparableOperator[] = [
	'eq',
	'ne',
	'gt',
	'gte',
	'lt',
	'lte',
	'between',
];
export const gridFilterNullOperator: GridFilterNullOperator[] = ['null', 'not_null'];

export const gridFilterNames: Record<GridFilterOperator, string> = {
	like: 'Contiene',
	not_like: 'No Contiene',
	in: 'Incluye',
	not_in: 'Excluye',
	eq: 'Igual',
	ne: 'Distinto',
	lt: 'Menor a',
	lte: 'Menor o igual a',
	gt: 'Mayor a',
	gte: 'Mayor o igual a',
	between: 'Entre',
	null: 'Nulo',
	not_null: 'No Nulo',
};

const reGridFilterOperator =
	/^(like|not_like|in|not_in|eq|ne|eq|ne|gt|gte|lt|lte|between|null|not_null):(string|number|date|time|datetime):(.*)$/;
const reGridSort = /^([+-]?)([a-zA-Z0-9_.]*)$/;

export type GridFilterOptions = {
	type: GridFilterType;
	operators: GridFilterOperator[];
	filter?: Partial<GridFilter>;
	validator?: (filter: GridFilter) => string;
	options?: Option[];
	multiple?: boolean;
};

export type GridClassFn = (data: any) => string;
export type GridRowFn<Row, Res> = (data: Row) => Res | undefined;
export type GridColFn<Row, Res> = (col: GridColumn<Row>) => Res | undefined;
export type GridCellFn<Row, Res> = (col: GridColumn<Row>, data: Row) => Res | undefined;

export type GridRenderOptions<Row> = {
	icon?: GridCellFn<Row, string>;
	text?: GridCellFn<Row, string>;
	href?: GridCellFn<Row, string>;
	click?: GridCellFn<Row, void>;
	classFn?: GridCellFn<Row, string>;
	empty?: string;
	color?: GridCellFn<Row, ButtonColor>;
	size?: GridCellFn<Row, ButtonSize>;
	tooltip?: GridCellFn<Row, string>;
};

export type GridColumn<Row> = {
	id: string;
	field?: string;
	header?: string;
	renderer: any;
	rendererOptions: GridRenderOptions<Row>;
	sortable?: boolean;
	sortAsc?: boolean;
	filter?: any;
	filterOptions?: GridFilterOptions;
	width?: number;
	minWidth?: number;
	maxWidth?: number;
	flex?: number;
};

export type GridOptions<Row> = {
	tHead?: string;
	tBody?: string;
	tFoot?: string;
	headerRow?: string;
	headerCell?: GridColFn<Row, string>;
	bodyRow?: GridRowFn<Row, string>;
	bodyCell?: GridCellFn<Row, string>;
	footRow?: string;
	footCell?: GridColFn<Row, string>;
	headerHeight?: number;
	bodyRowHeight?: number;
};

export type GridFilter = {
	field: string;
	type: GridFilterType;
	operator: GridFilterOperator;
	value: string;
};
export type GridSort = {
	field: string;
	asc?: boolean;
};

export type GridRequest = {
	pageIndex: number;
	pageSize: number;
	filters: GridFilter[];
	sort: GridSort;
};

export type GridStats = GridRequest & {
	pageCount: number;
	totalCount: number;
};

export type GridResult<T> = GridStats & {
	list: T[];
};

export class GridPage<T extends {}> {
	request: Writable<GridRequest>;
	result: Writable<GridResult<T>>;
	errors: string[] | null = null;
	dialog: DialogOptions<T>;
	readonly env: EnvPublic;
	constructor(ctor: () => T) {
		this.dialog = new DialogOptions<T>(ctor);
		this.env = EnvPublic.getInstance();
		this.request = writable<GridRequest>({
			pageIndex: 0,
			pageSize: this.env.defaultGridSize,
			filters: [],
			sort: { field: '' },
		});
		this.result = writable<GridResult<T>>({
			pageIndex: 0,
			pageSize: this.env.defaultGridSize,
			pageCount: 0,
			totalCount: 0,
			list: [],
			filters: [],
			sort: { field: '' },
		});
	}

	setResult(res: GridResult<T>) {
		const { pageIndex, pageSize, filters, sort } = res;
		this.result.set(res);
		this.request.set({ pageIndex, pageSize, filters, sort });
	}
}

export class GridManager {
	static readonly DI = Symbol.for('GridManager');
	static getInstance(): GridManager {
		return injectable.get(GridManager.DI);
	}
	readonly env: EnvPublic;
	constructor() {
		injectable.set(GridManager.DI, this);
		this.env = EnvPublic.getInstance();
	}

	getGridRequestFromSearch(search: URLSearchParams): GridRequest {
		const sIndex = search.get('pageIndex');
		const sSize = search.get('pageSize');
		const sFilters = (search.get('filters') || '').split(',');
		const filters: GridFilter[] = sFilters
			.map((s) => {
				const value = search.get('f_' + s) || '';
				const match = value.match(reGridFilterOperator);
				if (!match) return null;
				return {
					field: s,
					operator: match[1],
					type: match[2],
					value: match[3],
				};
			})
			.filter(Boolean) as GridFilter[];
		const sSort = search.get('sort') || '';
		const mSort = sSort.match(reGridSort);
		return {
			pageIndex: sIndex != null ? +(sIndex || 0) : 0,
			pageSize: (sSize != null ? +(sSize || 0) : undefined) || this.env.defaultGridSize,
			filters,
			sort: mSort ? { field: mSort[2] as string, asc: mSort[1] != '-' } : { field: '' },
		};
	}

	setGridRequestToSearch(search: URLSearchValues, request: GridRequest) {
		if (request.pageIndex) search.pageIndex = request.pageIndex;
		if (request.pageSize) search.pageSize = request.pageSize;
		if (request.filters) {
			search.filters = request.filters.map((f) => f.field).join(',');
			request.filters.forEach((f) => {
				search['f_' + f.field] = [f.operator, f.type, f.value].join(':');
			});
		}
		search.sort = [request.sort.asc === false ? '-' : '', request.sort.field].join('');
	}
	getRowClass<Row>(data: any, cls: GridRowFn<Row, string> | undefined) {
		if (cls) return cls(data);
	}
	getColClass<Row>(col: GridColumn<Row>, cls: GridColFn<Row, string> | undefined) {
		if (cls) return cls(col);
	}
	getCellClass<Row>(col: GridColumn<Row>, data: Row, cls: GridCellFn<Row, string> | undefined) {
		if (cls) return cls(col, data);
	}
	getColWidthStyle<Row>(col: GridColumn<Row>): string {
		const styles: string[] = [];
		if (col.width != null) styles.push(`width: ${col.width}px;`);
		if (col.minWidth != null) styles.push(`min-width: ${col.minWidth}px;`);
		if (col.maxWidth != null) styles.push(`max-width: ${col.maxWidth}px;`);
		if (col.flex != null) styles.push(`flex: ${col.flex};`);
		return styles.join(' ');
	}
	isValidFilter(filter?: GridFilter) {
		if (!filter) return false;
		switch (filter.operator) {
			case 'null':
				return !!filter.field;
			case 'not_null':
				return !!filter.field;
			default:
				return !!filter.field && !!filter.value;
		}
	}
}
