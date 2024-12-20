import { Logger } from './logger.js';

type FormField = {
	key: string;
	val: any;
	input: HTMLInputElement | HTMLSelectElement;
};

export function fillForm(form: HTMLFormElement, data: {}) {
	const logger = Logger.getInstance();
	form.reset();
	Object.entries(data)
		.map(([key, val]) => ({ key, val, input: form[key] }) as FormField)
		.filter((field) => field.input != null)
		.forEach((field) => {
			const { key, val, input } = field;
			const value = val.toString();
			const type = [input.tagName, input.type].join(':');
			//logger.debug(`input key:${key} type: ${type} value: '${value}'`);
			switch (type) {
				case 'INPUT:hidden':
					input.setAttribute('value', value);
					input.value = value;
					break;
				case 'INPUT:email':
					input.setAttribute('value', value);
					setTimeout(() => {
						input.value = value;
						input.dispatchEvent(new Event('input'));
					});
					break;
				case 'INPUT:text':
					input.setAttribute('value', value);
					setTimeout(() => {
						input.value = value;
						input.dispatchEvent(new Event('input'));
					});
					break;
				case 'INPUT:number':
					input.setAttribute('value', value);
					setTimeout(() => {
						input.value = value;
						input.dispatchEvent(new Event('input'));
					});
					break;
				case 'INPUT:checkbox':
					const checked = value && value != 'false';
					const el = input as HTMLInputElement;
					if (checked) input.setAttribute('checked', '');
					else input.removeAttribute('checked');
					setTimeout(() => {
						el.checked = checked;
						input.dispatchEvent(new Event('input'));
					});
					break;
				case 'SELECT:select-one':
					input.setAttribute('value', value);
					setTimeout(() => {
						input.value = value;
						input.dispatchEvent(new Event('input'));
					});
					break;
				default:
					logger.warn(`input key: ${key} not supported. type: ${type}`);
			}
		});
}

export function fillFormValues(form: HTMLFormElement, data: {}) {
	const logger = Logger.getInstance();
	form.reset();
	Object.entries(data)
		.map(([key, val]) => ({ key, val, input: form[key] }) as FormField)
		.filter((field) => field.input != null)
		.forEach((field) => {
			const { key, val, input } = field;
			const value = val.toString();
			const type = [input.tagName, input.type].join(':');
			//logger.debug(`input key:${key} type: ${type} value: '${value}'`);
			switch (type) {
				case 'INPUT:hidden':
					input.value = value;
					break;
				case 'INPUT:email':
					input.value = value;
					input.dispatchEvent(new Event('input'));
					break;
				case 'INPUT:text':
					input.value = value;
					input.dispatchEvent(new Event('input'));
					break;
				case 'INPUT:number':
					input.value = value;
					input.dispatchEvent(new Event('input'));
					break;
				case 'INPUT:checkbox':
					const checked = value && value != 'false';
					const el = input as HTMLInputElement;
					el.checked = checked;
					input.dispatchEvent(new Event('input'));
					break;
				case 'SELECT:select-one':
					input.value = value;
					input.dispatchEvent(new Event('change'));
					break;
				default:
					logger.warn(`input key: ${key} not supported. type: ${type}`);
			}
		});
}

export function fillFormAttributes(form: HTMLFormElement, data: {}) {
	const logger = Logger.getInstance();
	form.reset();
	Object.entries(data)
		.map(([key, val]) => ({ key, val, input: form[key] }) as FormField)
		.filter((field) => field.input != null)
		.forEach((field) => {
			const { key, val, input } = field;
			const value = val.toString();
			const type = [input.tagName, input.type].join(':');
			//logger.debug(`input key:${key} type: ${type} value: '${value}'`);
			switch (type) {
				case 'INPUT:hidden':
					input.setAttribute('value', value);
					break;
				case 'INPUT:email':
					input.setAttribute('value', value);
					break;
				case 'INPUT:text':
					input.setAttribute('value', value);
					break;
				case 'INPUT:number':
					input.setAttribute('value', value);
					break;
				case 'INPUT:checkbox':
					const checked = value && value != 'false';
					if (checked) input.setAttribute('checked', '');
					else input.removeAttribute('checked');
					break;
				case 'SELECT:select-one':
					input.setAttribute('value', value);
					break;
				default:
					logger.warn(`input key: ${key} not supported. type: ${type}`);
			}
		});
}
