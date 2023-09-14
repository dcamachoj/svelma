import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        homeUrl: string;
        logoUrl: string;
        logoWidth: number;
        logoHeight: number;
        dataTarget: string;
        menuOpen?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type NavbarBrandProps = typeof __propDef.props;
export type NavbarBrandEvents = typeof __propDef.events;
export type NavbarBrandSlots = typeof __propDef.slots;
export default class NavbarBrand extends SvelteComponent<NavbarBrandProps, NavbarBrandEvents, NavbarBrandSlots> {
}
export {};
