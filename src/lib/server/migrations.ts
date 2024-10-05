import fs from 'fs/promises';
import path from 'path';
import type {
	Migration,
	MigrationEntry,
	MigrationFile,
	MigrationResult,
} from '$lib/models/migration.js';
import { Logger } from '$lib/utils/logger.js';
import { Db } from './db.js';

export class MigrationManager {
	private readonly db: Db;
	private readonly logger: Logger;
	constructor() {
		this.db = Db.getInstance();
		this.logger = Logger.getInstance();
	}

	async getAppliedMigrations(): Promise<Migration[]> {
		let migrations: Migration[] = [];
		try {
			migrations = await this.db.execConn(async (conn) => {
				const [results] = await conn.query('SELECT * FROM migrations ORDER BY created_at');
				return results as any[];
			});
		} catch (err: any) {
			console.error('getAppliedMigrations ERROR:', err.sqlMessage);
		}
		return migrations;
	}

	async readMigrationFiles(...roots: string[]): Promise<MigrationFile[]> {
		const root = path.join(...roots);
		const files = await fs.readdir(root);
		return files
			.filter((s) => s.endsWith('.sql'))
			.map((s) => ({
				name: s.slice(0, -4),
				filename: path.join(root, s),
			}))
			.toSorted();
	}

	getMigrations(migrationFiles: MigrationFile[], appliedMigrations: Migration[]): MigrationEntry[] {
		return migrationFiles.map((mf) => ({
			...mf,
			applied_at: appliedMigrations.find((m) => m.name == mf.name)?.created_at,
		}));
	}

	async applyMigrationScript(src: MigrationFile): Promise<MigrationResult> {
		const content = await fs.readFile(src.filename, 'utf-8');
		const groups = content
			.split(/\r?\n\r?\n/) // win, mac or linux
			.map((s) => s.trim())
			.filter(Boolean);
		const nGroups = groups.length;
		let sql: string = '';
		try {
			await this.db.execConn(async (conn) => {
				for (let k = 0; k < nGroups; k++) {
					sql = groups[k];
					await conn.execute(sql);
				}
			});
		} catch (err: any) {
			console.error(`applyMigrationScript[${src.name}]`, err);
			if (err.sqlMessage) {
				return {
					...src,
					error: err.sqlMessage,
					sql,
				};
			}
			throw err;
		}
		return src;
	}
	async applyMigration(src: MigrationFile): Promise<MigrationResult> {
		let result = await this.applyMigrationScript(src);
		if (result.error) return result;
		await this.db.execConn(async (conn) => {
			return conn.execute('INSERT INTO migrations(name)VALUES(?)', [src.name]);
		});
		return result;
	}
}
