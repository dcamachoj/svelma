import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        id: string;
        label: string;
        placeholder?: string | undefined;
        type?: "text" | "password" | "email" | "tel" | undefined;
        value: string | undefined;
        valid?: val.Result | undefined;
        action?: val.Action | undefined;
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
