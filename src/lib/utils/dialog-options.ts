import { writable, type Writable } from 'svelte/store';

export class DialogOptions<T extends {}> {
	addActive: Writable<boolean> = writable<boolean>(false);
	edtActive: Writable<boolean> = writable<boolean>(false);
	delActive: Writable<boolean> = writable<boolean>(false);
	selected: Writable<T>;
	constructor(readonly ctor: () => T) {
		this.selected = writable<T>(ctor());
		this.addShow = this.addShow.bind(this);
		this.addHide = this.addHide.bind(this);
		this.edtShow = this.edtShow.bind(this);
		this.edtHide = this.edtHide.bind(this);
		this.delShow = this.delShow.bind(this);
		this.delHide = this.delHide.bind(this);
	}

	addShow() {
		this.selected.set(this.ctor());
		setTimeout(() => this.addActive.set(true), 0);
	}
	addHide() {
		this.addActive.set(false);
	}
	edtShow(selected: T) {
		this.selected.set({ ...selected });
		setTimeout(() => this.edtActive.set(true), 0);
	}
	edtHide() {
		this.edtActive.set(false);
	}
	delShow(selected: T) {
		this.selected.set({ ...selected });
		setTimeout(() => this.delActive.set(true), 0);
	}
	delHide() {
		this.delActive.set(false);
	}
	onAction(
		action: 'insert' | 'update' | 'remove' | undefined,
		errors: string[] | null,
		done?: boolean,
	) {
		const active =
			action == 'insert'
				? this.addActive
				: action == 'update'
					? this.edtActive
					: action == 'remove'
						? this.delActive
						: null;
		if (!active) return;
		if (errors) active.set(true);
		if (done) active.set(false);
	}
}

export class PageOptions<T extends {}> {
	list: T[] = [];
	count: number = 0;
	lastSearch: string = '';
	errors: string[] | null = null;
	dialog: DialogOptions<T>;
	constructor(ctor: () => T) {
		this.dialog = new DialogOptions<T>(ctor);
	}
}
