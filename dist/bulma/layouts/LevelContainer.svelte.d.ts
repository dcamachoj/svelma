import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        isRight?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type LevelContainerProps = typeof __propDef.props;
export type LevelContainerEvents = typeof __propDef.events;
export type LevelContainerSlots = typeof __propDef.slots;
export default class LevelContainer extends SvelteComponent<LevelContainerProps, LevelContainerEvents, LevelContainerSlots> {
}
export {};
