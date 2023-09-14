import { SvelteComponent } from "svelte";
import type { Colors, BwColors } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        isTransparent?: boolean | undefined;
        fixed?: 'top' | 'bottom' | undefined;
        color?: Colors | BwColors | undefined;
        isSpaced?: boolean | undefined;
        hasShadow?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NavbarProps = typeof __propDef.props;
export type NavbarEvents = typeof __propDef.events;
export type NavbarSlots = typeof __propDef.slots;
export default class Navbar extends SvelteComponent<NavbarProps, NavbarEvents, NavbarSlots> {
}
export {};
