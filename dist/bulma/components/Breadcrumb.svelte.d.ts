import { SvelteComponent } from "svelte";
import type { BulmaHelper, Action, BreadcrumbSeparator, ContentSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        items: Action[];
        active?: string | undefined;
        isCentered?: boolean | undefined;
        isRight?: boolean | undefined;
        separator?: BreadcrumbSeparator | undefined;
        size?: ContentSize | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BreadcrumbProps = typeof __propDef.props;
export type BreadcrumbEvents = typeof __propDef.events;
export type BreadcrumbSlots = typeof __propDef.slots;
export default class Breadcrumb extends SvelteComponent<BreadcrumbProps, BreadcrumbEvents, BreadcrumbSlots> {
}
export {};
