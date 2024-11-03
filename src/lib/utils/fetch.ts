import { Logger } from './logger.js';
import { setAppMessage } from './stores.js';
import type { ValidationError, ValidatorErrors } from './validation.js';

export type URLSearchValues = {
	[key: string]: string | number;
};
export type AppFetchInput = {
	fetch?: typeof fetch;
	url?: string;
	search?: URLSearchValues;
};

export type FormDataObject<T> = Record<keyof T, string>;

export async function appFetch(
	input: AppFetchInput,
	init?: RequestInit | undefined,
	handleError?: ((response: Response) => Promise<void>) | undefined,
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
		if (handleError) {
			await handleError(response);
		} else {
			setAppMessage('Error de conexión', 'error');
		}
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
	const response = await appFetch(input, init, async (r) => {
		if (r.headers?.get('content-type') == 'application/json') {
			const result = await r.json();
			Logger.getInstance().debug({ input, init, body, result });
			if (result.hasOwnProperty('message')) {
				setAppMessage(result.message, 'error', result);
			}
		}
	});
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
	let validatorErrors: ValidatorErrors | null = null;
	const response = await appFetch(input, init, async (r) => {
		if (r.headers?.get('content-type') == 'application/json') {
			const result = await r.json();
			Logger.getInstance().debug({ input, init, body, result });
			if (result.hasOwnProperty('message')) {
				setAppMessage(result.message, 'error', result);
			}
			if (result.hasOwnProperty('errors')) {
				validatorErrors = result.errors;
			}
		}
	});
	if (!response.ok) {
		return [null, validatorErrors];
	}
	const result = await response.json();
	return [result, null];
}

export function formDataToObject<T extends {}>(formData: FormData): FormDataObject<T> {
	const res: any = {};
	for (const [key, val] of formData) {
		res[key] = val.toString();
	}
	return res;
}

export function formToObject<T extends {}>(form: HTMLFormElement): FormDataObject<T> {
	const formData = new FormData(form);
	return formDataToObject(formData);
}
