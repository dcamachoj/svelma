import { SvelteComponent } from "svelte";
import type { ColumnGap } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        isGapless?: boolean | undefined;
        isMultiline?: boolean | undefined;
        isCentered?: boolean | undefined;
        isVCentered?: boolean | undefined;
        gap?: ColumnGap | undefined;
        gapMobile?: ColumnGap | undefined;
        gapTablet?: ColumnGap | undefined;
        gapTouch?: ColumnGap | undefined;
        gapDesktop?: ColumnGap | undefined;
        gapWidescreen?: ColumnGap | undefined;
        gapFullHD?: ColumnGap | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ColumnsProps = typeof __propDef.props;
export type ColumnsEvents = typeof __propDef.events;
export type ColumnsSlots = typeof __propDef.slots;
export default class Columns extends SvelteComponent<ColumnsProps, ColumnsEvents, ColumnsSlots> {
}
export {};
