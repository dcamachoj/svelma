import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        hasAddons?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TagsProps = typeof __propDef.props;
export type TagsEvents = typeof __propDef.events;
export type TagsSlots = typeof __propDef.slots;
export default class Tags extends SvelteComponent<TagsProps, TagsEvents, TagsSlots> {
}
export {};
