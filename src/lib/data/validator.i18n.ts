import type { I18n } from '$lib/utils/i18n.js';

const validatorTranslationsPrefix = 'validator_';

const validatorTranslationsEs = {
	required: 'Requerido',
	max_length: 'Debe tener a lo más {MAX} caracteres',
	empty: 'No vacío',
	not_valid: 'No válido',
	email_not_valid: 'Correo Electrónico no válido',
	url_not_valid: 'Hipervínculo no válido',
	number_not_valid: 'Número no válido',
	bigint_not_valid: 'Entero64 no válido',
	date_not_valid: 'Fecha no válida',
	time_not_valid: 'Hora no válida',
	datetime_not_valid: 'Fecha y Hora no válidas',
	boolean_not_valid: 'Booleano no válido',
	type_of: 'No es de tipo {EXPECTED}. Actual: {ACTUAL}',
	array: 'No es una lista',
	allowed_chars: 'Caracteres permitidos: "{VALIDCHARS}"',
	ne: 'Debe ser distinto a {ACTUAL}',
	gt: 'Debe ser mayor a {MIN}',
	ge: 'Debe ser mayor o igual a {MIN}',
	lt: 'Debe ser menor a {MAX}',
	le: 'Debe ser menor o igual a {MAX}',
	between: 'Debe estar entre {MIN} y {MAX}',
	type_string: 'Debe ser texto',
};

const validatorTranslationsEn: Record<keyof typeof validatorTranslationsEs, string> = {
	required: 'Required',
	max_length: 'Should have at most {MAX} characters',
	empty: 'Not empty',
	not_valid: 'Not valid',
	email_not_valid: 'Email not valid',
	url_not_valid: 'URL not valid',
	number_not_valid: 'Number not valid',
	bigint_not_valid: 'Bigint not valid',
	date_not_valid: 'Date not valid',
	time_not_valid: 'Time not valid',
	datetime_not_valid: 'DateTime not valid',
	boolean_not_valid: 'Boolean not valid',
	type_of: 'Not a type of {EXPECTED}. Actual: {ACTUAL}',
	array: 'Not an array',
	allowed_chars: 'Allowed chars: "{VALIDCHARS}"',
	ne: 'Should not be equal to {ACTUAL}',
	gt: 'Should be greater than {MIN}',
	ge: 'Should be greater than or equal to {MIN}',
	lt: 'Should be less than {MAX}',
	le: 'Should be less than or equal to {MAX}',
	between: 'Should be between {MIN} and {MAX}',
	type_string: 'Debe ser texto',
};

export function i18nValidatorEs(i18n: I18n) {
	return i18n.merge(validatorTranslationsEs, validatorTranslationsPrefix);
}

export function i18nValidatorEn(i18n: I18n) {
	return i18n.merge(validatorTranslationsEn, validatorTranslationsPrefix);
}
