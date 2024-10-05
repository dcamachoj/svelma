import {
	type GridFilter,
	type GridFilterType,
	type GridRequest,
	type GridResult,
} from '$lib/components/tables/grid-types.js';
import mysql, { type OkPacketParams, type RowDataPacket } from 'mysql2/promise';
import { QueryBuilder, type QueryBuilderCallback } from './builder.js';
import { type PageRequest, type PageResponse } from '$lib/components/tables/page.js';
import { EnvPrivate, EnvPublic } from '$lib/utils/env.js';
import { injectable } from '$lib/utils/di.js';

type DeleteCheckCallback = () => Promise<string>;
const localTimeZoneOffset = new Date().getTimezoneOffset();
const dateFormat = new Intl.DateTimeFormat('es-bo', {
	year: '2-digit',
	month: '2-digit',
	day: '2-digit',
});
const timeFormat = new Intl.DateTimeFormat('es-bo', {
	hour: '2-digit',
	hour12: false,
	minute: '2-digit',
	second: '2-digit',
});
const dateTimeFormat = new Intl.DateTimeFormat('es-bo', {
	year: '2-digit',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	hour12: false,
	minute: '2-digit',
	second: '2-digit',
});
export const CurrentTimestamp = 'CURRENT_TIMESTAMP';

export const tableNames = {};

export abstract class Repository {
	protected readonly envPublic: EnvPublic;
	protected readonly envPrivate: EnvPrivate;
	constructor(readonly tablename: string) {
		this.select = this.select.bind(this);
		this.envPublic = injectable.get(EnvPublic.DI);
		this.envPrivate = injectable.get(EnvPrivate.DI);
	}

	abstract select(qb: QueryBuilder, alias?: string): QueryBuilder;

	protected like(str: string, startStar: boolean = true, endStar: boolean = true): string {
		if (!str) {
			if (startStar || endStar) return '%';
			return '';
		}
		if (startStar) str = '*' + str;
		if (endStar) str += '*';
		str = str.replaceAll('*', '%');
		str = str.replaceAll(' ', '%');
		str = str.replaceAll('?', '_');
		while (str.indexOf('%%') >= 0) {
			str = str.replaceAll(/[%]{2,}/g, '%');
		}
		return str;
	}

	protected getCount(results: any): number {
		return results && results.length ? (results[0].count ?? 0) : 0;
	}

	protected async getSingle<T>(
		conn: mysql.Connection,
		sql: string,
		args: any[],
	): Promise<T | null> {
		const [results] = await conn.query(sql, args);
		const rows = results as RowDataPacket[];
		if (rows.length == 0) return null;
		return rows[0] as T;
	}
	protected async getSingleOrMore<T>(
		conn: mysql.Connection,
		sql: string,
		args: any[],
	): Promise<[T | null, boolean]> {
		const [results] = await conn.query(sql, args);
		const rows = results as RowDataPacket[];
		if (rows.length == 0) return [null, false];
		return [rows[0] as T, rows.length > 1];
	}
	protected async getList<T extends {}>(
		conn: mysql.Connection,
		sql: string,
		args: any[],
	): Promise<T[]> {
		const [results] = await conn.query(sql, args);
		const rows = results as RowDataPacket[];
		return (rows as T[]).map(this.mapRow);
	}
	protected async getInsert(conn: mysql.Connection, sql: string, args: any[]): Promise<void> {
		await conn.execute(sql, args);
	}
	protected async getInsertId(conn: mysql.Connection, sql: string, args: any[]): Promise<bigint> {
		await conn.execute(sql, args);
		const insertId = await this.getSingle<{ lastInsertid: string }>(
			conn,
			'SELECT LAST_INSERT_ID() as lastInsertid',
			[],
		);
		return BigInt(insertId?.lastInsertid ?? 0);
	}
	protected async getAffectedRows(
		conn: mysql.Connection,
		sql: string,
		args: any[],
	): Promise<number> {
		const [result] = await conn.execute(sql, args);
		const stats = result as OkPacketParams;
		return stats.affectedRows ?? 0;
	}

	protected removePrefix<T extends {}>(src: any, ...prefixes: string[]): T {
		const res: any = { ...src };
		prefixes.forEach((prefix) => {
			Object.entries(src).forEach(([key, val]) => {
				if (key.startsWith(prefix + '_')) {
					res[key.slice(prefix.length + 1)] = val;
					delete res[key];
				}
			});
		});
		return res;
	}

	protected removeObject<T extends {}>(src: any, prefix: string): T {
		const res: any = {};
		const prefixKey = prefix + '_';
		const prefixLen = prefixKey.length;
		const entries = Object.entries(src)
			.map(([key, val]) => ({ key, val }))
			.filter(({ key, val }) => key.startsWith(prefixKey));
		entries.forEach(({ key, val }) => {
			const pKey = key.slice(prefixLen);
			res[pKey] = val;
			delete src[key];
		});
		return res;
	}

	protected getPageCount(totalCount: number, pageSize: number) {
		if (!pageSize) return 0;
		return Math.ceil(totalCount / pageSize);
	}

	protected async getPage<Req extends Object = {}, Res extends Object = {}>(
		conn: mysql.Connection,
		qbList: QueryBuilder,
		qbCount: QueryBuilder,
		request: PageRequest<Req>,
		cb: QueryBuilderCallback,
		cbList?: QueryBuilderCallback,
		cbCount?: QueryBuilderCallback,
		mapper?: (src: any) => Res | Promise<Res>,
	): Promise<PageResponse<Req, Res>> {
		const pageIndex = request.pageIndex || 0;
		const pageSize = request.pageSize || this.envPublic.defaultPageSize;
		cb(qbList);
		cb(qbCount);
		if (cbList) cbList(qbList);
		if (cbCount) cbCount(qbCount);
		if (request.sort && request.sort?.field) {
			qbList.orderBy(request.sort.field, request.sort.asc === false ? 'desc' : 'asc');
		}
		qbList.page({ pageIndex, pageSize });
		const [sqlList, argList] = qbList.build();
		const [sqlCount, argCount] = qbCount.build();
		const [list] = await conn.query(sqlList, argList);
		const [count] = await conn.query(sqlCount, argCount);
		console.log(sqlList);
		console.log(argList);
		const totalCount = this.getCount(count);
		let rList = (list as RowDataPacket[] as Res[]).map(this.mapRow);
		if (mapper) {
			for (let k = 0; k < rList.length; k++) {
				const r = rList[k];
				rList[k] = await mapper(r);
			}
		}
		// @ts-ignore
		return {
			...request,
			list: rList,
			pageIndex,
			pageSize,
			pageCount: this.getPageCount(totalCount, pageSize),
			totalCount,
		};
	}

	protected async grid<T extends {}>(
		conn: mysql.Connection,
		qbList: QueryBuilder,
		qbCount: QueryBuilder,
		request: GridRequest,
		cb: QueryBuilderCallback,
		cbList?: QueryBuilderCallback,
		cbCount?: QueryBuilderCallback,
		mapper?: (src: any) => T | Promise<T>,
	): Promise<GridResult<T>> {
		const pageIndex = request.pageIndex || 0;
		const pageSize = request.pageSize || getEnvDefaultGridSize();
		cb(qbList);
		cb(qbCount);
		if (cbList) cbList(qbList);
		if (cbCount) cbCount(qbCount);
		(request.filters || []).forEach((f) => this.gridFilters(f, qbList, qbCount));
		if (request.sort && request.sort?.field) {
			qbList.orderBy(request.sort.field, request.sort.asc === false ? 'desc' : 'asc');
		}
		qbList.page(request);
		const [sqlList, argList] = qbList.build();
		const [sqlCount, argCount] = qbCount.build();
		const [list] = await conn.query(sqlList, argList);
		const [count] = await conn.query(sqlCount, argCount);
		console.log(sqlList);
		console.log(argList);
		const totalCount = this.getCount(count);
		let rList = (list as RowDataPacket[] as T[]).map(this.mapRow);
		if (mapper) {
			for (let k = 0; k < rList.length; k++) {
				const r = rList[k];
				rList[k] = await mapper(r);
			}
		}
		return {
			list: rList,
			pageIndex,
			pageSize,
			pageCount: this.getPageCount(totalCount, pageSize),
			totalCount,
			filters: request.filters,
			sort: request.sort,
		};
	}

	async listAll<T extends {}>(
		conn: mysql.Connection,
		alias: string,
		cb: QueryBuilderCallback,
		mapper?: (src: T, idx?: number) => T,
		cbSelect?: QueryBuilderCallback,
	) {
		const qb = this.select(new QueryBuilder(), alias);
		if (cbSelect) cbSelect(qb);
		qb.from(this.tablename, alias);
		cb(qb);
		const [sql, arg] = qb.build();
		console.log(sql);
		console.log(arg);
		const [list] = await conn.query(sql, arg);
		let rList = (list as RowDataPacket[] as T[]).map(this.mapRow);
		if (mapper) rList = rList.map(mapper);
		return rList;
	}

	protected gridTypeIsComparable(type: GridFilterType) {
		if (type == 'string') return false;
		return true;
	}
	protected gridFilterValue(filter: GridFilter, value?: string): [string, any] {
		if (value == null) value = filter.value;
		switch (filter.type) {
			case 'number':
				return ['?', +value];
			case 'date':
				const date = new Date(Date.parse(value));
				date.setMinutes(date.getMinutes() + localTimeZoneOffset);
				return ['?', date];
			case 'time':
				return ['?', value];
			case 'datetime':
				const dateTime = new Date(Date.parse(value.replace(' ', 'T')));
				dateTime.setMinutes(dateTime.getMinutes() + localTimeZoneOffset);
				return ['?', dateTime];
			default:
				return ['?', value];
		}
	}
	protected gridFilters(f: GridFilter, qbList: QueryBuilder, qbCount: QueryBuilder) {
		const qbs = [qbList, qbCount];
		switch (f.operator) {
			case 'eq':
				qbs.forEach((qb) => {
					const [str, val] = this.gridFilterValue(f);
					qb.where(`${f.field} = ${str}`).arg(val);
				});
				break;
			case 'ne':
				qbs.forEach((qb) => {
					const [str, val] = this.gridFilterValue(f);
					qb.where(`${f.field} <> ${str}`).arg(val);
				});
				break;
			case 'in':
				const inValues = f.value.split(',').map((s) => this.gridFilterValue(f, s));
				qbs.forEach((qb) => {
					qb.where(`${f.field} IN (${inValues.map((v) => v[0]).join(',')})`).args(
						...inValues.map((v) => v[1]),
					);
				});
				break;
			case 'not_in':
				const ninValues = f.value.split(',').map((s) => this.gridFilterValue(f, s));
				qbs.forEach((qb) => {
					qb.where(`${f.field} NOT IN (${ninValues.map((v) => v[0]).join(',')})`).args(
						...ninValues.map((v) => v[1]),
					);
				});
				break;
			case 'gt':
				if (!this.gridTypeIsComparable(f.type)) break;
				qbs.forEach((qb) => {
					const [str, val] = this.gridFilterValue(f);
					qb.where(`${f.field} > ${str}`).arg(val);
				});
				break;
			case 'gte':
				if (!this.gridTypeIsComparable(f.type)) break;
				qbs.forEach((qb) => {
					const [str, val] = this.gridFilterValue(f);
					qb.where(`${f.field} >= ${str}`).arg(val);
				});
				break;
			case 'lt':
				if (!this.gridTypeIsComparable(f.type)) break;
				qbs.forEach((qb) => {
					const [str, val] = this.gridFilterValue(f);
					qb.where(`${f.field} < ${str}`).arg(val);
				});
				break;
			case 'lte':
				if (!this.gridTypeIsComparable(f.type)) break;
				qbs.forEach((qb) => {
					const [str, val] = this.gridFilterValue(f);
					qb.where(`${f.field} <= ${str}`).arg(val);
				});
				break;
			case 'like':
				if (f.type != 'string') break;
				qbs.forEach((qb) => qb.where(`${f.field} LIKE ?`).arg(this.like(f.value)));
				break;
			case 'not_like':
				if (f.type != 'string') break;
				qbs.forEach((qb) => qb.where(`${f.field} NOT LIKE ?`).arg(this.like(f.value)));
				break;
			case 'between':
				if (!this.gridTypeIsComparable(f.type)) break;
				const betweenValues = f.value.split(',').map((s) => this.gridFilterValue(f, s));
				if (betweenValues.length != 2) break;
				qbs.forEach((qb) =>
					qb
						.where(`${f.field} BETWEEN ${betweenValues[0][0]} AND ${betweenValues[1][0]}`)
						.args(...betweenValues.map((v) => v[1])),
				);
				break;
			case 'null':
				qbs.forEach((qb) => qb.where(`${f.field} IS NULL`));
				break;
			case 'not_null':
				qbs.forEach((qb) => qb.where(`${f.field} IS NOT NULL`));
				break;
		}
	}

	protected async deleteCheck(...cbs: DeleteCheckCallback[]): Promise<string> {
		for (const cb of cbs) {
			const check = await cb();
			if (check) return check;
		}
		return '';
	}

	protected mapRow<T extends {}>(row: T, idx: number): T {
		if (this.envPublic.urlHome.indexOf('localhost') >= 0) {
			for (let key in row) {
				const val = row[key];
				if (val instanceof Date) {
					row[key] = new Date(+val - val.getTimezoneOffset() * 60000) as any;
				}
			}
		}
		return row;
	}

	protected dateArg(src: string | Date, days: number = 0): string {
		let date = new Date(src);
		if (days) date.setDate(date.getDate() + days);
		//console.log('dateArg', { src, date });
		if (this.envPublic.urlHome.indexOf('localhost') >= 0) {
			date = new Date(+date + date.getTimezoneOffset() * 60000);
			//console.log('dateArg.localhost', { src, date });
		}
		const yy = date.getFullYear().toString();
		const mm = (date.getMonth() + 1).toString().padStart(2, '0');
		const dd = date.getDate().toString().padStart(2, '0');
		return [yy, mm, dd].join('-');
	}
}
