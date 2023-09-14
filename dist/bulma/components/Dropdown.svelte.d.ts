import { SvelteComponent } from "svelte";
import type { BulmaHelper, Action } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        id: string;
        items: Action[];
        triggerText?: string | undefined;
        triggerIcon?: string | undefined;
        isActive?: boolean | undefined;
        isHoverable?: boolean | undefined;
        isRight?: boolean | undefined;
        isUp?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DropdownProps = typeof __propDef.props;
export type DropdownEvents = typeof __propDef.events;
export type DropdownSlots = typeof __propDef.slots;
export default class Dropdown extends SvelteComponent<DropdownProps, DropdownEvents, DropdownSlots> {
}
export {};
