import {
	FormBigIntField,
	FormBooleanField,
	FormCheckboxField,
	FormDateField,
	FormDateTimeField,
	FormNumberField,
	FormStringField,
	FormTimeField,
	type FormError,
	type FormField,
	type FormFieldValidation,
} from './form-field.js';

export type FormSchemaErrors<T> = Partial<{
	[F in keyof T]: FormError;
}>;
export type FormSchemaResult<T> = {
	value: T;
	errors: FormSchemaErrors<T>;
	hasErrors: boolean;
};
export type FormSchemaDefinition<T> = {
	[F in keyof T]: FormField;
};

export class FormSchema<T> {
	constructor(readonly def: FormSchemaDefinition<T>) {
		Object.entries(def).forEach(([key, val]) => {
			(val as FormField).id = key;
		});
	}

	parse(formData: FormData): FormSchemaResult<T> {
		const result: FormSchemaResult<T> = {
			value: {} as T,
			errors: {},
			hasErrors: false,
		};
		Object.values(this.def).forEach((formField) => {
			const field = formField as FormField;
			const id = field.id as keyof T;
			const fieldResult: FormFieldValidation = {
				value: formData.get(field.id)?.toString(),
			};
			field.validate(fieldResult);
			result.value[id] = fieldResult.value;
			result.errors[id] = fieldResult.error;
		});
		result.hasErrors = Object.values(result.errors).filter(Boolean).length > 0;
		return result;
	}
	parseSearchParams(search: URLSearchParams): FormSchemaResult<T> {
		const result: FormSchemaResult<T> = {
			value: {} as T,
			errors: {},
			hasErrors: false,
		};
		Object.values(this.def).forEach((formField) => {
			const field = formField as FormField;
			const id = field.id as keyof T;
			const fieldResult: FormFieldValidation = {
				value: search.get(field.id)?.toString(),
			};
			field.validate(fieldResult);
			result.value[id] = fieldResult.value;
			result.errors[id] = fieldResult.error;
		});
		result.hasErrors = Object.values(result.errors).filter(Boolean).length > 0;
		return result;
	}
}

class FormDef {
	str() {
		return new FormStringField();
	}
	num() {
		return new FormNumberField();
	}
	id() {
		return new FormBigIntField();
	}
	date() {
		return new FormDateField();
	}
	time() {
		return new FormTimeField();
	}
	datetime() {
		return new FormDateTimeField();
	}
	checkbox() {
		return new FormCheckboxField();
	}
	bool() {
		return new FormBooleanField();
	}
}

export const formDef = new FormDef();
