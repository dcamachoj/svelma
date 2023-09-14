import { SvelteComponent } from "svelte";
import type { BulmaHelper, Colors, ContentSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        icon?: string | undefined;
        text?: string | undefined;
        color?: Colors | 'dark' | undefined;
        size?: ContentSize | undefined;
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
export type MessageProps = typeof __propDef.props;
export type MessageEvents = typeof __propDef.events;
export type MessageSlots = typeof __propDef.slots;
export default class Message extends SvelteComponent<MessageProps, MessageEvents, MessageSlots> {
}
export {};
