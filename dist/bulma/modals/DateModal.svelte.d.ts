import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        id: string;
        active: boolean;
        header: string;
        label: string;
        value: Date | undefined;
        step?: string | number | undefined;
        valid?: val.Result | undefined;
        action?: val.Action | undefined;
        okLabel?: string | undefined;
        okIcon?: "cancel" | "close" | "noImage" | "home" | "login" | "logout" | "settings" | "save" | "yes" | "no" | "upload" | "ruler" | "payment" | "add" | "trash" | "back" | undefined;
        clrLabel?: string | undefined;
        clrIcon?: "cancel" | "close" | "noImage" | "home" | "login" | "logout" | "settings" | "save" | "yes" | "no" | "upload" | "ruler" | "payment" | "add" | "trash" | "back" | undefined;
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
export type DateModalProps = typeof __propDef.props;
export type DateModalEvents = typeof __propDef.events;
export type DateModalSlots = typeof __propDef.slots;
export default class DateModal extends SvelteComponent<DateModalProps, DateModalEvents, DateModalSlots> {
}
export {};
