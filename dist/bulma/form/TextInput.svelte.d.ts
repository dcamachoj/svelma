import { SvelteComponent } from "svelte";
import type { Action, Result } from '../../utils/validators.js';
import type { Colors, InputSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        id: string;
        label: string;
        placeholder?: string | undefined;
        type?: "text" | "password" | "email" | "tel" | undefined;
        value: string | undefined;
        valid?: Result | undefined;
        action?: Action | undefined;
        color?: Colors | undefined;
        size?: InputSize | undefined;
        isRounded?: boolean | undefined;
        isLoading?: boolean | undefined;
    };
    events: {
        'value-changed': CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextInputProps = typeof __propDef.props;
export type TextInputEvents = typeof __propDef.events;
export type TextInputSlots = typeof __propDef.slots;
export default class TextInput extends SvelteComponent<TextInputProps, TextInputEvents, TextInputSlots> {
}
export {};
