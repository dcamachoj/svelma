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
export type NavbarEndProps = typeof __propDef.props;
export type NavbarEndEvents = typeof __propDef.events;
export type NavbarEndSlots = typeof __propDef.slots;
export default class NavbarEnd extends SvelteComponent<NavbarEndProps, NavbarEndEvents, NavbarEndSlots> {
}
export {};
