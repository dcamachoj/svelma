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
export type HeroHeadProps = typeof __propDef.props;
export type HeroHeadEvents = typeof __propDef.events;
export type HeroHeadSlots = typeof __propDef.slots;
export default class HeroHead extends SvelteComponent<HeroHeadProps, HeroHeadEvents, HeroHeadSlots> {
}
export {};
