import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type NavbarDividerProps = typeof __propDef.props;
export type NavbarDividerEvents = typeof __propDef.events;
export type NavbarDividerSlots = typeof __propDef.slots;
export default class NavbarDivider extends SvelteComponent<NavbarDividerProps, NavbarDividerEvents, NavbarDividerSlots> {
}
export {};
