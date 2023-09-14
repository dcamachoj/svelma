import { SvelteComponent } from "svelte";
import type { BulmaHelper, Colors, InputSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        id: string;
        rows?: number | undefined;
        placeholder?: string | undefined;
        disabled?: boolean | undefined;
        value: string | Number;
        color?: Colors | undefined;
        size?: InputSize | undefined;
        isRounded?: boolean | undefined;
        isHovered?: boolean | undefined;
        isFocused?: boolean | undefined;
        isStatic?: boolean | undefined;
        readonly?: boolean | undefined;
        hasFixedSize?: boolean | undefined;
    };
    events: {
        'value-changed': CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextareaProps = typeof __propDef.props;
export type TextareaEvents = typeof __propDef.events;
export type TextareaSlots = typeof __propDef.slots;
export default class Textarea extends SvelteComponent<TextareaProps, TextareaEvents, TextareaSlots> {
}
export {};
