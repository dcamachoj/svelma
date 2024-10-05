export type PageSort = {
	field: string;
	asc?: boolean;
};
export type PageRequest<Req extends Object = {}> = Req & {
	search?: string;
	pageIndex: number;
	pageSize?: number;
	sort?: PageSort;
};

export type PageResponse<Req extends Object = {}, Res extends Object = {}> = PageRequest<Req> & {
	list: Res[];
	pageCount: number;
	totalCount: number;
};
