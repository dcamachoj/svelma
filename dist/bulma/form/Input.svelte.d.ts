import { SvelteComponent } from "svelte";
import type { BulmaHelper, Colors, InputSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        id: string;
        placeholder?: string | undefined;
        type?: "number" | "text" | "password" | "email" | "tel" | undefined;
        value: string | Number;
        color?: Colors | undefined;
        size?: InputSize | undefined;
        isRounded?: boolean | undefined;
        isHovered?: boolean | undefined;
        isFocused?: boolean | undefined;
        isStatic?: boolean | undefined;
        readonly?: boolean | undefined;
        disabled?: boolean | undefined;
    };
    events: {
        'value-changed': CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponent<InputProps, InputEvents, InputSlots> {
}
export {};
