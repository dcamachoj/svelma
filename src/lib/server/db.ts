import type { EnvPrivate } from './env.js';
import { injectable } from '$lib/utils/injectable.js';
import { Logger } from '$lib/utils/logger.js';
import mysql from 'mysql2/promise';

export class Db {
	static readonly DI = Symbol.for('Db');
	static getInstance(): Db {
		return injectable.get(Db.DI);
	}
	private readonly pool: mysql.Pool;
	private readonly logger: Logger;
	constructor(readonly env: EnvPrivate) {
		injectable.set(Db.DI, this);
		this.logger = Logger.getInstance();
		this.pool = mysql.createPool({
			uri: env.dbConnection,
			supportBigNumbers: true,
			bigNumberStrings: true,
		});
	}

	async execConn<T>(cb: (conn: mysql.Connection) => PromiseLike<T>): Promise<T> {
		const conn = await this.pool.getConnection();
		try {
			await conn.connect();
			return await cb(conn);
		} finally {
			await conn.release();
		}
	}

	async execTx<T>(cb: (conn: mysql.Connection) => PromiseLike<T>): Promise<T> {
		return this.execConn(async (conn) => {
			let result: T;
			try {
				await conn.beginTransaction();
				result = await cb(conn);
				await conn.commit();
				return result;
			} finally {
				await conn.rollback();
			}
		});
	}
}
