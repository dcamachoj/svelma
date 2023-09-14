import { SvelteComponent } from "svelte";
import { type BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        isSelected?: boolean | undefined;
        isBordered?: boolean | undefined;
        isStriped?: boolean | undefined;
        isNarrow?: boolean | undefined;
        isHoverable?: boolean | undefined;
        isFullWidth?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type RowProps = typeof __propDef.props;
export type RowEvents = typeof __propDef.events;
export type RowSlots = typeof __propDef.slots;
export default class Row extends SvelteComponent<RowProps, RowEvents, RowSlots> {
}
export {};
