import { setAppMessage } from './stores.js';
import type { ValidatorErrors } from './validation.js';

export type URLSearchValues = {
	[key: string]: string | number;
};
export type AppFetchInput = {
	fetch?: typeof fetch;
	url?: string;
	search?: URLSearchValues;
};

export async function appFetch(
	input: AppFetchInput,
	init?: RequestInit | undefined,
): Promise<Response> {
	let url = input.url || '';
	if (input.search) {
		const search = new URLSearchParams();
		Object.entries(input.search).forEach(([key, val]) => {
			search.append(key, val.toString());
		});
		url += '?' + search.toString();
	}
	const aFetch = input.fetch || fetch;
	const response = await aFetch(url, init);
	if (!response.ok) {
		console.error('appFetch Error', {
			input,
			status: response.status,
			message: response.statusText,
		});
		setAppMessage('Error de conexión', 'error');
	}
	return response;
}

export async function appFetchJson<Req extends {}, Res extends {}>(
	input: AppFetchInput,
	init?: RequestInit | undefined,
	body?: Req,
): Promise<Res | null> {
	if (!init) init = {};
	init = {
		...init,
		headers: {
			...(init.headers || {}),
		},
	};
	if (body) {
		const headers = init.headers!! as any;
		headers['Content-Type'] = 'application/json';
		init.body = JSON.stringify(body);
	}
	const response = await appFetch(input, init);
	if (!response.ok) return null;
	return response.json();
}

export async function appFetchJsonErrors<Req extends {}, Res extends {}>(
	input: AppFetchInput,
	init?: RequestInit | undefined,
	body?: Req,
): Promise<[Res | null, ValidatorErrors | null]> {
	if (!init) init = {};
	init = {
		...init,
		headers: {
			...(init.headers || {}),
		},
	};
	if (body) {
		const headers = init.headers!! as any;
		headers['Content-Type'] = 'application/json';
		init.body = JSON.stringify(body);
	}
	const response = await appFetch(input, init);
	if (!response.ok) {
		if (response.headers?.get('content-type') == 'application/json') {
			const result = await response.json();
			if (result.hasOwnProperty('message')) {
				setAppMessage(result.message, 'error');
			}
			if (result.hasOwnProperty('errors')) {
				return [null, result.errors];
			}
		}
		return [null, null];
	}
	const result = await response.json();
	return [result, null];
}

export function formDataToObject<T extends {}>(formData: FormData): T {
	const res: any = {};
	for (const [key, val] of formData) {
		res[key] = val.toString();
	}
	return res as T;
}

export function formToObject<T extends {}>(form: HTMLFormElement): T {
	const formData = new FormData(form);
	return formDataToObject(formData);
}
