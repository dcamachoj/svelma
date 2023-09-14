import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        href: string | undefined;
        isButton?: boolean | undefined;
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
export type PanelBlockProps = typeof __propDef.props;
export type PanelBlockEvents = typeof __propDef.events;
export type PanelBlockSlots = typeof __propDef.slots;
export default class PanelBlock extends SvelteComponent<PanelBlockProps, PanelBlockEvents, PanelBlockSlots> {
}
export {};
