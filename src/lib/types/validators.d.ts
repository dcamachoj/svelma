namespace val {
	export type Function = (value: any) => boolean;
	export type MessageFunction = (value: any) => string;
	export type Message = string | MessageFunction;
	export type DirtyCheck = (value: any, dirty: boolean) => boolean;
	export type ActionResult = {
		update(value: any): void;
	};
	export type ActionFunction = (node: HTMLElement, binding: any) => ActionResult;
	export interface ActionInterface {
		setDirty(value: boolean);
	}
	export type Action = ActionInterface & {
		use: ActionFunction;
		input: SmuiActionFunction;
	};
	export type SmuiActionFunction = (node: HTMLElement) => {
		destroy: () => void;
	};
	export interface Result {
		dirty: boolean;
		valid: boolean;
		message?: string;
		value?: any;
	}
	export interface IValidator {
		validate(value: any): boolean;
		message(value: any): string;
	}
}
