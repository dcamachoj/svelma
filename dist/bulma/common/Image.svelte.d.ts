import { SvelteComponent } from "svelte";
import type { BulmaHelper, ImageSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        imgSrc: string | undefined;
        imgAlt?: string | undefined;
        size?: ImageSize | undefined;
        isRounded?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ImageProps = typeof __propDef.props;
export type ImageEvents = typeof __propDef.events;
export type ImageSlots = typeof __propDef.slots;
export default class Image extends SvelteComponent<ImageProps, ImageEvents, ImageSlots> {
}
export {};
