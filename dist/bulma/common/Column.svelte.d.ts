import { SvelteComponent } from "svelte";
import type { ColumnSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        size?: ColumnSize | undefined;
        sizeMobile?: ColumnSize | undefined;
        sizeTablet?: ColumnSize | undefined;
        sizeTouch?: ColumnSize | undefined;
        sizeDesktop?: ColumnSize | undefined;
        sizeWidescreen?: ColumnSize | undefined;
        sizeFulHD?: ColumnSize | undefined;
        offset?: ColumnSize | undefined;
        offsetMobile?: ColumnSize | undefined;
        offsetTablet?: ColumnSize | undefined;
        offsetTouch?: ColumnSize | undefined;
        offsetDesktop?: ColumnSize | undefined;
        offsetWidescreen?: ColumnSize | undefined;
        offsetFullHD?: ColumnSize | undefined;
        isNarrow?: boolean | undefined;
        isNarrowMobile?: boolean | undefined;
        isNarrowTablet?: boolean | undefined;
        isNarrowTouch?: boolean | undefined;
        isNarrowDesktop?: boolean | undefined;
        isNarrowWidescreen?: boolean | undefined;
        isNarrowFullHD?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ColumnProps = typeof __propDef.props;
export type ColumnEvents = typeof __propDef.events;
export type ColumnSlots = typeof __propDef.slots;
export default class Column extends SvelteComponent<ColumnProps, ColumnEvents, ColumnSlots> {
}
export {};
