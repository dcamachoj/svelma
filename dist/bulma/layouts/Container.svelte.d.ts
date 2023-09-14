import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        isWidescreen?: boolean | undefined;
        isFullHD?: boolean | undefined;
        isMaxDesktop?: boolean | undefined;
        isMaxWidescreen?: boolean | undefined;
        isFluid?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ContainerProps = typeof __propDef.props;
export type ContainerEvents = typeof __propDef.events;
export type ContainerSlots = typeof __propDef.slots;
export default class Container extends SvelteComponent<ContainerProps, ContainerEvents, ContainerSlots> {
}
export {};
