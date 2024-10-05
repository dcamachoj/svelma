export type Migration = {
	id: number;
	created_at?: Date;
	name: string;
};

export type MigrationFile = {
	name: string;
	filename: string;
};

export type MigrationEntry = MigrationFile & {
	applied_at?: Date;
};

export type MigrationResult = MigrationFile & {
	error?: string;
	sql?: string;
};
