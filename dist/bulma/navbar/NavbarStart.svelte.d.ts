import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NavbarStartProps = typeof __propDef.props;
export type NavbarStartEvents = typeof __propDef.events;
export type NavbarStartSlots = typeof __propDef.slots;
export default class NavbarStart extends SvelteComponent<NavbarStartProps, NavbarStartEvents, NavbarStartSlots> {
}
export {};
