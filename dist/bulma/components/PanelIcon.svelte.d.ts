import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        icon: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PanelIconProps = typeof __propDef.props;
export type PanelIconEvents = typeof __propDef.events;
export type PanelIconSlots = typeof __propDef.slots;
export default class PanelIcon extends SvelteComponent<PanelIconProps, PanelIconEvents, PanelIconSlots> {
}
export {};
