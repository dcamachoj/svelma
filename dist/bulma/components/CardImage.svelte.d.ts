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
export type CardImageProps = typeof __propDef.props;
export type CardImageEvents = typeof __propDef.events;
export type CardImageSlots = typeof __propDef.slots;
export default class CardImage extends SvelteComponent<CardImageProps, CardImageEvents, CardImageSlots> {
}
export {};
