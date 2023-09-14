import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        id: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NavbarMenuProps = typeof __propDef.props;
export type NavbarMenuEvents = typeof __propDef.events;
export type NavbarMenuSlots = typeof __propDef.slots;
export default class NavbarMenu extends SvelteComponent<NavbarMenuProps, NavbarMenuEvents, NavbarMenuSlots> {
}
export {};
