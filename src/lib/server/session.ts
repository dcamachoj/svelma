import type { RedisClientType } from '@redis/client';

export class SessionManager<TPrincipal extends { id: bigint }> {
	constructor(
		private readonly client: RedisClientType,
		private readonly prefix: string,
		private readonly cookieMaxAge: number,
	) {}
	async getSessionPrincipal(session_id: string): Promise<TPrincipal | null> {
		const sessionContent = await this.client.get(`${this.prefix}_session_${session_id}`);
		if (!sessionContent) {
			console.log(`No session[${session_id}] in Redis`);
			return null;
		}
		try {
			const principal: TPrincipal = JSON.parse(sessionContent);
			const userSession = await this.client.get(`${this.prefix}_user_${principal.id}`);
			if (userSession !== session_id) {
				console.log(`No user[${principal.id}] in Redis`);
				return null;
			}
			return principal;
		} catch (err) {
			console.error(`Parsing Principal session.id: ${session_id}`);
			console.error('sessionContent: ', sessionContent);
			console.error(err);
			return null;
		}
	}

	async setSessionPrincipal(session_id: string, principal: TPrincipal) {
		await this.client.set(`${this.prefix}_session_${session_id}`, JSON.stringify(principal), {
			EX: this.cookieMaxAge * 3600,
		});
		await this.client.set(`${this.prefix}_user_${principal.id}`, session_id, {
			EX: this.cookieMaxAge * 3600,
		});
	}

	async clrSessionPrincipal(session_id?: string, principal?: TPrincipal) {
		if (!session_id) return;
		await this.client.del(`${this.prefix}_session_${session_id}`);
		if (principal) {
			await this.client.del(`${this.prefix}_user_${principal.id}`);
		}
	}

	async clrSessionFromId(id: number) {
		const session_id = await this.client.get(`${this.prefix}_user_${id}`);
		if (session_id) {
			await this.client.del(`${this.prefix}_session_${session_id}`);
		}
		await this.client.del(`${this.prefix}_user_${id}`);
	}
}
