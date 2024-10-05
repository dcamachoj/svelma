import { injectable } from './injectable.js';

export class EnvPublic {
	static readonly DI = Symbol.for('EnvPublic');
	static getInstance(): EnvPublic {
		return injectable.get(EnvPublic.DI);
	}
	constructor(
		readonly defaultGridSize: number,
		readonly defaultPageSize: number,
		readonly messageTimeout: number,
		readonly urlHome: string,
		readonly mainHeaderHeight: number,
		readonly mainFooterHeight: number,
	) {
		injectable.set(EnvPublic.DI, this);
	}
}
