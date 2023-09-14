import { SvelteComponent } from "svelte";
import type { BulmaHelper, PaginationAlign, ContentSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        pages: number[];
        prevIcon?: string | undefined;
        prevText?: string | undefined;
        prevPages?: number[] | undefined;
        nextIcon?: string | undefined;
        nextText?: string | undefined;
        nextPages?: number[] | undefined;
        current?: number | undefined;
        align?: PaginationAlign | undefined;
        isRounded?: boolean | undefined;
        size?: ContentSize | undefined;
    };
    events: {
        page: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PaginationProps = typeof __propDef.props;
export type PaginationEvents = typeof __propDef.events;
export type PaginationSlots = typeof __propDef.slots;
export default class Pagination extends SvelteComponent<PaginationProps, PaginationEvents, PaginationSlots> {
}
export {};
