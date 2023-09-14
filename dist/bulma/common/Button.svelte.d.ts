import { SvelteComponent } from "svelte";
import { type BulmaHelper } from '../../utils/bulma.js';
import type { ClsArgument } from '../../utils/classnames.js';
declare const __propDef: {
    props: {
        className?: ClsArgument;
        bulma?: BulmaHelper | undefined;
        href?: string | undefined;
        icon?: string | undefined;
        text?: string | undefined;
        color?: "primary" | "link" | "info" | "success" | "warning" | "danger" | "white" | "black" | "light" | "dark" | "text" | "ghost" | null | undefined;
        light?: boolean | undefined;
        size?: "normal" | "medium" | "small" | "large" | null | undefined;
        responsive?: boolean | undefined;
        fullWidth?: boolean | undefined;
        outlined?: boolean | undefined;
        inverted?: boolean | undefined;
        rounded?: boolean | undefined;
        loading?: boolean | undefined;
        isStatic?: boolean | undefined;
        disabled?: boolean | undefined;
        target?: ((string & {}) | "_self" | "_blank" | "_parent" | "_top") | null | undefined;
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
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponent<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
