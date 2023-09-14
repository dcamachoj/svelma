import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        hasTextCentered?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type LevelItemProps = typeof __propDef.props;
export type LevelItemEvents = typeof __propDef.events;
export type LevelItemSlots = typeof __propDef.slots;
export default class LevelItem extends SvelteComponent<LevelItemProps, LevelItemEvents, LevelItemSlots> {
}
export {};
