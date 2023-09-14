import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type PanelHeadingProps = typeof __propDef.props;
export type PanelHeadingEvents = typeof __propDef.events;
export type PanelHeadingSlots = typeof __propDef.slots;
export default class PanelHeading extends SvelteComponent<PanelHeadingProps, PanelHeadingEvents, PanelHeadingSlots> {
}
export {};
