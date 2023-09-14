import { SvelteComponent } from "svelte";
import type { BulmaHelper, TitleSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        subtitle?: boolean | undefined;
        size?: TitleSize | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TitleProps = typeof __propDef.props;
export type TitleEvents = typeof __propDef.events;
export type TitleSlots = typeof __propDef.slots;
export default class Title extends SvelteComponent<TitleProps, TitleEvents, TitleSlots> {
}
export {};
