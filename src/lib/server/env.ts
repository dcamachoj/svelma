import { injectable } from '$lib/utils/injectable.js';

export class EnvPrivate {
	static readonly DI = Symbol.for('EnvPrivate');
	static getInstance(): EnvPrivate {
		return injectable.get(EnvPrivate.DI);
	}
	constructor(
		readonly dbConnection: string,
		readonly redisConnection: string,
		readonly redisPrefix: string,
	) {
		injectable.set(EnvPrivate.DI, this);
	}
}
