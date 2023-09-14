import { SvelteComponent } from "svelte";
import type { BulmaHelper, Colors } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        color?: Colors | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type PanelProps = typeof __propDef.props;
export type PanelEvents = typeof __propDef.events;
export type PanelSlots = typeof __propDef.slots;
export default class Panel extends SvelteComponent<PanelProps, PanelEvents, PanelSlots> {
}
export {};
