import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        iconLeft?: string | undefined;
        iconRight?: string | undefined;
        isExpanded?: boolean | undefined;
        isLoading?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ControlProps = typeof __propDef.props;
export type ControlEvents = typeof __propDef.events;
export type ControlSlots = typeof __propDef.slots;
export default class Control extends SvelteComponent<ControlProps, ControlEvents, ControlSlots> {
}
export {};
