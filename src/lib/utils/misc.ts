export function to_snake_case(str: string) {
	return str.replace(/(([a-z])(?=[A-Z][a-zA-Z])|([A-Z])(?=[A-Z][a-z]))/g, '$1_').toLowerCase();
}
