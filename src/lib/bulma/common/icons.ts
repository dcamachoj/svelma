import {
	mdiAccountCircleOutline,
	mdiBackspace,
	mdiCancel,
	mdiChevronDown,
	mdiClose,
	mdiCog,
	mdiContentSave,
	mdiCreditCardOutline,
	mdiHome,
	mdiImageBroken,
	mdiLogin,
	mdiLogout,
	mdiPlus,
	mdiRuler,
	mdiThumbDown,
	mdiThumbUp,
	mdiTrashCan,
	mdiUpload
} from '@mdi/js';

export const icons = {
	noImage: mdiImageBroken,
	home: mdiHome,
	login: mdiLogin,
	logout: mdiLogout,
	settings: mdiCog,
	save: mdiContentSave,
	yes: mdiThumbUp,
	no: mdiThumbDown,
	cancel: mdiCancel,
	upload: mdiUpload,
	close: mdiClose,
	ruler: mdiRuler,
	payment: mdiCreditCardOutline,
	add: mdiPlus,
	trash: mdiTrashCan,
	back: mdiBackspace,
	chevronDown: mdiChevronDown
};

export type Icons = keyof typeof icons;
