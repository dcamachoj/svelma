import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        icon?: string | undefined;
        text?: string | undefined;
        isHoverable?: boolean | undefined;
        isRight?: boolean | undefined;
        isUp?: boolean | undefined;
        isArrowless?: boolean | undefined;
        isBoxed?: boolean | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NavbarDropdownProps = typeof __propDef.props;
export type NavbarDropdownEvents = typeof __propDef.events;
export type NavbarDropdownSlots = typeof __propDef.slots;
export default class NavbarDropdown extends SvelteComponent<NavbarDropdownProps, NavbarDropdownEvents, NavbarDropdownSlots> {
}
export {};
