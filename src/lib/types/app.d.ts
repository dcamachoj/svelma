namespace app {
	export interface Message {
		message: string;
		type: MessageType;
		light?: boolean;
		timeout?: number | false;
	}
	export type MessageType = 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
	export interface Action {
		name: string;
		text?: string;
		icon?: string;
	}
	export type UserRoles = 'admin';

	export type ClsValue = string | number | undefined | null;
	export type ClsMapping = { [key: string]: any };
	export type ClsArgument = ClsValue | ClsMapping | ClsArgument[];

	export type ActiveFunction = (pathname: string) => boolean;
	export type Active = boolean | RegExp | string | string[] | ActiveFunction;
	export type Click = (e?: any) => void;
	export interface MenuItem {
		name: string;
		icon?: string;
		text?: string;
		active?: boolean;
		href?: string;
		click?: Click;
		role?: UserRoles;
		roles?: UserRoles[];
		children?: MenuItem[];
	}

	export interface LayoutLink {
		name: string;
		text?: string;
		icon?: string; // Icon Type
		link?: string;
	}
	export interface PageArgs {
		index: number;
		size: number;
		offset: number;
	}
	export interface Page<T> {
		list: T[];
		index: number;
		size: number;
		count: number;
		total: number;
	}
	export interface ItemSelection {
		name: string;
		text: string;
		selected: boolean;
	}
	export interface FileItem {
		filename: string;
		dataUrl?: string;
		type: string;
		size: number;
	}
	export type ModalCheck<T> = (v: T) => boolean;
	export interface IDto {
		toDto(): Record<string, any>;
	}
	export interface ID {
		id: number;
	}
	export interface IValid {
		isValid: boolean;
	}
	export interface IEntity extends ID, IDto, IValid {
		created_at: Date;
		updated_at: Date;
		clone<T extends IEntity>(src: Partial<T>): T;
	}
	export interface IPrincipal extends IEntity {
		email: string;
		displayName: string;
		photoUrl: string;
		firstName: string;
		lastName: string;
		roles: string[];
		hasAnyRole(...roles: string[]): boolean;
		isMenuAllowed(menu: app.MenuItem): boolean;
	}
	export interface IUser extends IPrincipal, IValid {
		birthday?: Date;
		height?: number;
		phone?: string;
		expires?: Date;
		measurement?: IMeasurement;
		improvement?: IImprovement;
	}
	export interface IMeasurement extends IEntity, IValid {
		id?: string;
		createdAt: Date;
		weight: number;
		fatPercentage: number;
		musclePercentage: number;
		visceralFat: number;
		fatWeight: number;
		muscleWeight: number;
		weightFixed: string;
		fatFixed: string;
		muscleFixed: string;
		visceralFatFixed: string;
	}
	export interface IImprovement extends IValid, IMap {
		weight: number;
		fat: number;
		muscle: number;
		weightFixed: string;
		fatFixed: string;
		muscleFixed: string;
	}
	export interface IMeasurementAdd {
		weight: number;
		fatPercentage: number;
		musclePercentage: number;
		visceralFat: number;
	}
}
