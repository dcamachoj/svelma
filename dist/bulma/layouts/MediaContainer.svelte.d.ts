import { SvelteComponent } from "svelte";
import type { BulmaHelper, MediaAlign } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        align?: MediaAlign | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type MediaContainerProps = typeof __propDef.props;
export type MediaContainerEvents = typeof __propDef.events;
export type MediaContainerSlots = typeof __propDef.slots;
export default class MediaContainer extends SvelteComponent<MediaContainerProps, MediaContainerEvents, MediaContainerSlots> {
}
export {};
