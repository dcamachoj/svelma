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
export type CardProps = typeof __propDef.props;
export type CardEvents = typeof __propDef.events;
export type CardSlots = typeof __propDef.slots;
export default class Card extends SvelteComponent<CardProps, CardEvents, CardSlots> {
}
export {};
