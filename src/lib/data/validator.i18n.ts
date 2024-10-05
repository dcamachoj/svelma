import type { I18nLang } from '$lib/svelma/utils/i18n.js';

export const translations: Record<string, I18nLang> = {
	validator_required: {
		en: 'Required',
		es: 'Requerido'
	},
	validator_empty: {
		en: 'Not empty',
		es: 'No vacío'
	},
	validator_not_valid: {
		en: 'Not valid',
		es: 'No válido'
	},
	validator_email_not_valid: {
		en: 'Email not valid',
		es: 'Correo Electrónico no válid,o'
	},
	validator_type_of: {
		en: 'Not a type of {EXPECTED}. Actual: {ACTUAL}',
		es: 'No es de tipo {EXPECTED}. Actual: {ACTUAL}'
	},
	validator_array: {
		en: 'Not an array',
		es: 'No es una lista'
	},
	validator_allowed_chars: {
		en: 'Allowed chars: "{VALIDCHARS}"',
		es: 'Caracteres permitidos: "{VALIDCHARS}"'
	},
	validator_ne: {
		en: 'Should not be equal to {ACTUAL}',
		es: 'Debe ser distinto a {ACTUAL}'
	},
	validator_gt: {
		en: 'Should be greater than {MIN}',
		es: 'Debe ser mayor a {MIN}'
	},
	validator_ge: {
		en: 'Should be greater than or equal to {MIN}',
		es: 'Debe ser mayor o igual a {MIN}'
	},
	validator_lt: {
		en: 'Should be less than {MAX}',
		es: 'Debe ser menor a {MAX}'
	},
	validator_le: {
		en: 'Should be less than or equal to {MAX}',
		es: 'Debe ser menor o igual a {MAX}'
	},
	validator_between: {
		en: 'Should be between {MIN} and {MAX}',
		es: 'Debe estar entre {MIN} y {MAX}'
	}
};
