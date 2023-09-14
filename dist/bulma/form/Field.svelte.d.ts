import { SvelteComponent } from "svelte";
import type { BulmaHelper, Colors, FieldAlign } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        helpText: string | undefined;
        helpColor?: Colors | undefined;
        addons?: FieldAlign | undefined;
        grouped?: FieldAlign | undefined;
        isGroupedMultiline?: boolean | undefined;
        isHorizontal?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type FieldProps = typeof __propDef.props;
export type FieldEvents = typeof __propDef.events;
export type FieldSlots = typeof __propDef.slots;
export default class Field extends SvelteComponent<FieldProps, FieldEvents, FieldSlots> {
}
export {};
