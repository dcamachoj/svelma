import { SvelteComponent } from "svelte";
import { type BulmaHelper } from '../../utils/bulma.js';
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
export type BlockProps = typeof __propDef.props;
export type BlockEvents = typeof __propDef.events;
export type BlockSlots = typeof __propDef.slots;
export default class Block extends SvelteComponent<BlockProps, BlockEvents, BlockSlots> {
}
export {};
