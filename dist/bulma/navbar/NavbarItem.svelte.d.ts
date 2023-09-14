import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        href: string;
        preventDefault?: boolean | undefined;
        isExpanded?: boolean | undefined;
        isTab?: boolean | undefined;
        isActive?: boolean | undefined;
    };
    events: {
        clicked: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NavbarItemProps = typeof __propDef.props;
export type NavbarItemEvents = typeof __propDef.events;
export type NavbarItemSlots = typeof __propDef.slots;
export default class NavbarItem extends SvelteComponent<NavbarItemProps, NavbarItemEvents, NavbarItemSlots> {
}
export {};
