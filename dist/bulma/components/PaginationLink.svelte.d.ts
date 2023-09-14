import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        page: number;
        isCurrent?: boolean | undefined;
    };
    events: {
        page: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PaginationLinkProps = typeof __propDef.props;
export type PaginationLinkEvents = typeof __propDef.events;
export type PaginationLinkSlots = typeof __propDef.slots;
export default class PaginationLink extends SvelteComponent<PaginationLinkProps, PaginationLinkEvents, PaginationLinkSlots> {
}
export {};
