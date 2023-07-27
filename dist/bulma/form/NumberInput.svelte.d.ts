import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        id: string;
        label: string;
        placeholder?: string | undefined;
        value: number | undefined;
        step?: number | undefined;
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
export type NumberInputProps = typeof __propDef.props;
export type NumberInputEvents = typeof __propDef.events;
export type NumberInputSlots = typeof __propDef.slots;
export default class NumberInput extends SvelteComponent<NumberInputProps, NumberInputEvents, NumberInputSlots> {
}
export {};
