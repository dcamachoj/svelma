export type PasswordValidity = {
	min_length: boolean;
	max_length?: boolean;
	min_lower?: boolean;
	min_upper?: boolean;
	min_digits?: boolean;
	min_symbols?: boolean;
};

export type PasswordValidatorConfig = {
	min_length: number;
	max_length?: number;
	min_lower?: number;
	min_upper?: number;
	min_digits?: number;
	min_symbols?: number;
	all_symbols?: string;
};

export const passwordValidatorTranslationsPrefix = 'password_validator_';

export const passwordValidatorTranslationsEs: Record<keyof PasswordValidity, string> = {
	min_length: 'Debe tener a lo menos {MIN_LENGTH} caracteres',
	max_length: 'Debe tener a lo más {MAX_LENGTH} caracteres',
	min_lower: 'Debe tener a lo menos {MIN_LOWER} minúsculas',
	min_upper: 'Debe tener a lo menos {MIN_UPPER} mayúsculas',
	min_digits: 'Debe tener a lo menos {MIN_DIGITS} dígitos',
	min_symbols: 'Debe tener a lo menos {MIN_SYMBOLS} símbolos de: {ALL_SYMBOLS}',
};
export const passwordValidatorTranslationsEn: Record<keyof PasswordValidity, string> = {
	min_length: 'Should have at least {MIN_LENGTH} characters',
	max_length: 'Should have at most {MAX_LENGTH} characters',
	min_lower: 'Should have at least {MIN_LOWER} lowercase letters',
	min_upper: 'Should have at least {MIN_UPPER} uppercase letters',
	min_digits: 'Should have at least {MIN_DIGITS} digits',
	min_symbols: 'Should have at least {MIN_SYMBOLS} symbols of: {ALL_SYMBOLS}',
};
