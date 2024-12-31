import { formDef, FormSchema } from '$lib/utils/form-schema.js';

export type PageSort = {
	field: string;
	desc?: boolean;
};
export type PageRequest = {
	search?: string;
	pageIndex: number;
	pageSize?: number;
	sort?: string;
};

export type PageResponse<Res extends Object = {}> = PageRequest & {
	list: Res[];
	pageCount: number;
	totalCount: number;
};

export function pageResponseToRequest(
	src: PageResponse,
	partial: Partial<PageRequest> = {},
): PageRequest {
	const pageRequest: any = { ...src };
	delete pageRequest.list;
	delete pageRequest.pageCount;
	delete pageRequest.totalCount;
	return { ...pageRequest, ...partial } as PageRequest;
}

export function parsePageRequestFromSearchParams(src: URLSearchParams): PageRequest {
	const pageSize = src.get('pageSize');
	return {
		search: src.get('search') || undefined,
		pageIndex: +(src.get('pageIndex') || 0),
		pageSize: pageSize != null ? +pageSize : undefined,
		sort: src.get('sort') || undefined,
	};
}

export function parsePageRequestFromFormData(src: FormData): PageRequest {
	const pageSize = src.get('pageSize')?.toString();
	return {
		search: src.get('search')?.toString(),
		pageIndex: +(src.get('pageIndex')?.toString() || 0),
		pageSize: pageSize != null ? +pageSize : undefined,
		sort: src.get('sort')?.toString(),
	};
}

export function serializePageRequestToSearchParams(src: PageRequest, search: URLSearchParams) {
	if (src.search != undefined) search.set('search', src.search);
	if (src.sort != undefined) search.set('sort', src.sort);
	if (src.pageIndex != 0) search.set('pageIndex', src.pageIndex.toString());
	if (src.pageSize ?? 0 != 0) search.set('pageSize', src.pageSize!!.toString());
}

export function serializePageRequestToFormData(src: PageRequest, formData: FormData) {
	if (src.search != undefined) formData.set('search', src.search);
	if (src.sort != undefined) formData.set('sort', src.sort);
	if (src.pageIndex != 0) formData.set('pageIndex', src.pageIndex.toString());
	if (src.pageSize ?? 0 != 0) formData.set('pageSize', src.pageSize!!.toString());
}

export function getPageRequestSort(sort?: string): PageSort | null {
	if (!sort) return null;
	const desc = sort.startsWith('-');
	const field = sort.replace(/^[+-]/, '');
	return { field, desc };
}

export const pageRequestFormSchema = new FormSchema<PageRequest>({
	search: formDef.str(),
	pageIndex: formDef.num().required(),
	pageSize: formDef.num(),
	sort: formDef.str(),
});
