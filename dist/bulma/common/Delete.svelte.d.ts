import { SvelteComponent } from "svelte";
import type { BulmaHelper, ContentSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        size?: ContentSize | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DeleteProps = typeof __propDef.props;
export type DeleteEvents = typeof __propDef.events;
export type DeleteSlots = typeof __propDef.slots;
export default class Delete extends SvelteComponent<DeleteProps, DeleteEvents, DeleteSlots> {
}
export {};
