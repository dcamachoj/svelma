import { SvelteComponent } from "svelte";
import type { BulmaHelper, Action } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        actions: Action[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type CardFooterProps = typeof __propDef.props;
export type CardFooterEvents = typeof __propDef.events;
export type CardFooterSlots = typeof __propDef.slots;
export default class CardFooter extends SvelteComponent<CardFooterProps, CardFooterEvents, CardFooterSlots> {
}
export {};
