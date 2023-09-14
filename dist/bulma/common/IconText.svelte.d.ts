import { SvelteComponent } from "svelte";
import { type BulmaHelper } from '../../utils/bulma.js';
import type { ClsArgument } from '../../utils/classnames.js';
declare const __propDef: {
    props: {
        icon?: string | undefined;
        text?: string | undefined;
        className?: ClsArgument;
        bulma?: BulmaHelper | undefined;
        block?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IconTextProps = typeof __propDef.props;
export type IconTextEvents = typeof __propDef.events;
export type IconTextSlots = typeof __propDef.slots;
export default class IconText extends SvelteComponent<IconTextProps, IconTextEvents, IconTextSlots> {
}
export {};
