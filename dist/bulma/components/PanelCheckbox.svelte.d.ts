import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        checked: boolean;
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
export type PanelCheckboxProps = typeof __propDef.props;
export type PanelCheckboxEvents = typeof __propDef.events;
export type PanelCheckboxSlots = typeof __propDef.slots;
export default class PanelCheckbox extends SvelteComponent<PanelCheckboxProps, PanelCheckboxEvents, PanelCheckboxSlots> {
}
export {};
