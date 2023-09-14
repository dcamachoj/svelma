import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type MediaObjectProps = typeof __propDef.props;
export type MediaObjectEvents = typeof __propDef.events;
export type MediaObjectSlots = typeof __propDef.slots;
export default class MediaObject extends SvelteComponent<MediaObjectProps, MediaObjectEvents, MediaObjectSlots> {
}
export {};
