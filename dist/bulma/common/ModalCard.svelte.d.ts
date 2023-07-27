import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        active: boolean;
        header?: string | undefined;
        actions?: app.Action[] | undefined;
    };
    events: {
        close: CustomEvent<any>;
        action: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        header: {};
        default: {};
        actions: {};
    };
};
export type ModalCardProps = typeof __propDef.props;
export type ModalCardEvents = typeof __propDef.events;
export type ModalCardSlots = typeof __propDef.slots;
export default class ModalCard extends SvelteComponent<ModalCardProps, ModalCardEvents, ModalCardSlots> {
}
export {};
