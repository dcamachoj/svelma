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
export type HeroBodyProps = typeof __propDef.props;
export type HeroBodyEvents = typeof __propDef.events;
export type HeroBodySlots = typeof __propDef.slots;
export default class HeroBody extends SvelteComponent<HeroBodyProps, HeroBodyEvents, HeroBodySlots> {
}
export {};
