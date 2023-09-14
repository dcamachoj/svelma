import { SvelteComponent } from "svelte";
import type { BulmaHelper, Colors } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        color?: Colors | undefined;
        hasDelete?: boolean | undefined;
        isLight?: boolean | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NotificationProps = typeof __propDef.props;
export type NotificationEvents = typeof __propDef.events;
export type NotificationSlots = typeof __propDef.slots;
export default class Notification extends SvelteComponent<NotificationProps, NotificationEvents, NotificationSlots> {
}
export {};
