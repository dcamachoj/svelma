import { getEnvDefaultPageSize } from '$lib/components/tables/page.js';
import mysql from 'mysql2/promise';

export type BuilderResult = [string, any[]];
export class Builder {
	private _lines: string[] = [];
	private _args: any[] = [];

	build(): BuilderResult {
		return [
			this._lines
				.join('\n')
				.replaceAll('\n,\n', ',\n')
				.replaceAll(/\n{2,}/g, '\n') + ';',
			[...this._args],
		];
	}

	protected has(line: string): boolean {
		return this._lines.indexOf(line) >= 0;
	}
	protected hasPrefix(prefix: string): boolean {
		return this._lines.some((s) => s.startsWith(prefix));
	}
	add(value: string): Builder {
		this._lines.push(value);
		return this;
	}
	arg(arg: any): Builder {
		this._args.push(arg);
		return this;
	}
	args(...args: any[]): Builder {
		this._args.push(...args);
		return this;
	}
	cond(prefixOk: string, prefixSep: string, condition: string) {
		const has = this.hasPrefix(prefixOk + ' ');
		const prefix = has ? prefixSep : prefixOk;
		this.add(`${prefix} ${condition}`);
	}
}

export type QueryBuilderChain = (qb: QueryBuilder) => QueryBuilder;
export type QueryBuilderSelectChain = {
	cb: (qb: QueryBuilder, alias?: string) => QueryBuilder;
	alias: string;
};

export class QueryBuilder extends Builder {
	chain(cb: QueryBuilderChain): QueryBuilder {
		return cb(this);
	}
	idn(...values: string[]): string {
		return mysql.escapeId(values.join(''));
	}
	select(field: string, alias?: string, idn?: boolean): QueryBuilder {
		const hasSelect = this.has('SELECT') || this.hasPrefix('SELECT ');
		const prefix = hasSelect ? ',\n  ' : 'SELECT ';
		if (idn) {
			if (alias) {
				this.add(`${prefix}${this.idn(alias, '.', field)} AS ${alias}_${field}`);
			} else {
				this.add(`${prefix}${this.idn(field)}`);
			}
		} else {
			if (alias) {
				this.add(`${prefix}${alias}.${field} AS ${alias}_${field}`);
			} else {
				this.add(`${prefix}${field}`);
			}
		}
		return this;
	}
	selectAs(field: string, alias: string): QueryBuilder {
		const hasSelect = this.has('SELECT') || this.hasPrefix('SELECT ');
		const prefix = hasSelect ? ',\n  ' : 'SELECT ';
		this.add(`${prefix}${field} AS ${alias}`);
		return this;
	}
	count(...fields: string[]): QueryBuilder {
		return this.select(`COUNT(${fields.join(',')}) AS count`);
	}
	countDistinct(...fields: string[]): QueryBuilder {
		return this.select(`COUNT(DISTINCT ${fields.join(',')}) AS count`);
	}
	from(tablename: string, alias?: string): QueryBuilder {
		if (alias) {
			this.add(`\nFROM ${tablename} AS ${alias}`);
		} else {
			this.add(`\nFROM ${tablename}`);
		}
		return this;
	}
	join(jType: 'INNER' | 'LEFT' | 'RIGHT', tablename: string, on: string): QueryBuilder {
		this.add(`${jType} JOIN ${tablename}\n  ON ${on}`);
		return this;
	}
	joinAs(
		jType: 'INNER' | 'LEFT' | 'RIGHT',
		tablename: string,
		alias: string,
		on: string,
	): QueryBuilder {
		this.add(`${jType} JOIN ${tablename} AS ${alias}\n  ON ${on}`);
		return this;
	}
	where(condition: string): QueryBuilder {
		this.cond('WHERE', 'AND', condition);
		return this;
	}
	having(condition: string): QueryBuilder {
		this.cond('HAVING', 'AND', condition);
		return this;
	}
	orderBy(field: string, dir: 'asc' | 'desc' = 'asc'): QueryBuilder {
		if (!field.endsWith(' asc') && !field.endsWith(' desc')) field += ` ${dir}`;
		this.cond('ORDER BY', ', ', field);
		return this;
	}
	groupBy(field: string): QueryBuilder {
		this.cond('GROUP BY', ', ', field);
		return this;
	}

	page(pageRequest: { pageIndex: number; pageSize: number }): QueryBuilder {
		const pageSize = pageRequest.pageSize || getEnvDefaultPageSize();
		const pageIndex = pageRequest.pageIndex || 0;
		this.add(`LIMIT ${pageSize} OFFSET ${pageIndex * pageSize}`);
		return this;
	}
	single(limit?: number): QueryBuilder {
		this.add(`LIMIT 1`);
		return this;
	}
	singleOrMore(limit?: number): QueryBuilder {
		this.add(`LIMIT 2`);
		return this;
	}
	chainSelect(...chain: QueryBuilderSelectChain[]): QueryBuilder {
		chain.forEach((c) => {
			c.cb(this, c.alias);
		});
		return this;
	}
}

export class InsertBuilder extends Builder {
	constructor(tablename: string) {
		super();
		this.add(`INSERT INTO ${tablename}`);
	}
	fields(...fields: string[]): InsertBuilder {
		if (fields.length) {
			this.add(`(${fields.join(',')})`);
		}
		return this;
	}
	fieldsTyped<T extends {}>(...fields: (keyof T)[]): InsertBuilder {
		if (fields.length) {
			this.add(`(${fields.join(',')})`);
		}
		return this;
	}
	values(...values: string[]): InsertBuilder {
		this.add(`VALUES (${values.join(',')})`);
		return this;
	}
	valuesArg(...args: any[]): InsertBuilder {
		const values = args.map((a) => '?');
		this.args(...args);
		return this.values(...values);
	}
}

export class UpdateBuilder extends Builder {
	constructor(tablename: string) {
		super();
		this.add(`UPDATE ${tablename}`);
	}
	/**
	 * Sets the values to update
	 * @param values field1 = literal1, field2 = ?
	 * @returns this UpdateBuilder
	 */
	set(...values: string[]): UpdateBuilder {
		this.add('SET');
		this.add(values.map((s) => `  ${s}`).join(',\n'));
		return this;
	}
	setTyped<T extends {}>(...values: (keyof T)[]): UpdateBuilder {
		this.add('SET');
		this.add(values.map((s) => `  ${s.toString()} = ?`).join(',\n'));
		return this;
	}
	where(condition: string): UpdateBuilder {
		this.cond('WHERE', 'AND', condition);
		return this;
	}
}

export class DeleteBuilder extends Builder {
	constructor(tablename: string) {
		super();
		this.add(`DELETE FROM ${tablename}`);
	}
	where(condition: string): DeleteBuilder {
		this.cond('WHERE', 'AND', condition);
		return this;
	}
}

export type QueryBuilderCallback = (qb: QueryBuilder) => void;
