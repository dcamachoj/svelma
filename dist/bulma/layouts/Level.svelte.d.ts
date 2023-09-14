import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        isMobile?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type LevelProps = typeof __propDef.props;
export type LevelEvents = typeof __propDef.events;
export type LevelSlots = typeof __propDef.slots;
export default class Level extends SvelteComponent<LevelProps, LevelEvents, LevelSlots> {
}
export {};
