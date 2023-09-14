import { SvelteComponent } from "svelte";
import { type BulmaHelper } from '../../utils/bulma.js';
import type { ClsArgument } from '../../utils/classnames.js';
declare const __propDef: {
    props: {
        avatar: string;
        className?: ClsArgument;
        bulma?: BulmaHelper | undefined;
        size?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AvatarProps = typeof __propDef.props;
export type AvatarEvents = typeof __propDef.events;
export type AvatarSlots = typeof __propDef.slots;
export default class Avatar extends SvelteComponent<AvatarProps, AvatarEvents, AvatarSlots> {
}
export {};
