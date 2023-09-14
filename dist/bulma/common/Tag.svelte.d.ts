import { SvelteComponent } from "svelte";
import type { BulmaHelper, Colors, BwColors, TagSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        color?: Colors | BwColors | undefined;
        size?: TagSize | undefined;
        isRounded?: boolean | undefined;
        hasDelete?: boolean | undefined;
        deleteSize?: ContentSize | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TagProps = typeof __propDef.props;
export type TagEvents = typeof __propDef.events;
export type TagSlots = typeof __propDef.slots;
export default class Tag extends SvelteComponent<TagProps, TagEvents, TagSlots> {
}
export {};
