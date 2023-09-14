import { SvelteComponent } from "svelte";
import type { BulmaHelper, Action } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        tabs: Action[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PanelTabsProps = typeof __propDef.props;
export type PanelTabsEvents = typeof __propDef.events;
export type PanelTabsSlots = typeof __propDef.slots;
export default class PanelTabs extends SvelteComponent<PanelTabsProps, PanelTabsEvents, PanelTabsSlots> {
}
export {};
