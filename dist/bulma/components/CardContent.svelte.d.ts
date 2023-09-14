import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type CardContentProps = typeof __propDef.props;
export type CardContentEvents = typeof __propDef.events;
export type CardContentSlots = typeof __propDef.slots;
export default class CardContent extends SvelteComponent<CardContentProps, CardContentEvents, CardContentSlots> {
}
export {};
