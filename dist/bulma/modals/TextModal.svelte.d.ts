import { SvelteComponent } from "svelte";
import type { Result, Action } from '../../utils/validators.js';
declare const __propDef: {
    props: {
        id: string;
        active: boolean;
        header: string;
        label: string;
        type?: "number" | "text" | "password" | "email" | "tel" | undefined;
        value: string | undefined;
        valid?: Result | undefined;
        action?: Action | undefined;
        okLabel?: string | undefined;
        okIcon?: "no" | "cancel" | "close" | "noImage" | "home" | "login" | "logout" | "settings" | "save" | "yes" | "upload" | "ruler" | "payment" | "add" | "trash" | "back" | "chevronDown" | undefined;
        clrLabel?: string | undefined;
        clrIcon?: "no" | "cancel" | "close" | "noImage" | "home" | "login" | "logout" | "settings" | "save" | "yes" | "upload" | "ruler" | "payment" | "add" | "trash" | "back" | "chevronDown" | undefined;
    };
    events: {
        clear: CustomEvent<any>;
        accept: CustomEvent<any>;
        'value-changed': CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextModalProps = typeof __propDef.props;
export type TextModalEvents = typeof __propDef.events;
export type TextModalSlots = typeof __propDef.slots;
export default class TextModal extends SvelteComponent<TextModalProps, TextModalEvents, TextModalSlots> {
}
export {};
