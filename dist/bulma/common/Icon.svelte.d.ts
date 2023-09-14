import { SvelteComponent } from "svelte";
import { type BulmaHelper } from '../../utils/bulma.js';
import type { ClsArgument } from '../../utils/classnames.js';
declare const __propDef: {
    props: {
        icon: string;
        iconClass?: string | undefined;
        className?: ClsArgument;
        helper?: BulmaHelper | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IconProps = typeof __propDef.props;
export type IconEvents = typeof __propDef.events;
export type IconSlots = typeof __propDef.slots;
export default class Icon extends SvelteComponent<IconProps, IconEvents, IconSlots> {
}
export {};
