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
export type HeroFootProps = typeof __propDef.props;
export type HeroFootEvents = typeof __propDef.events;
export type HeroFootSlots = typeof __propDef.slots;
export default class HeroFoot extends SvelteComponent<HeroFootProps, HeroFootEvents, HeroFootSlots> {
}
export {};
