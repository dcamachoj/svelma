import { SvelteComponent } from "svelte";
import type { BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        isTitleCentered?: boolean | undefined;
        header?: string | undefined;
        buttonIcon?: string | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        button: {};
    };
};
export type CardHeaderProps = typeof __propDef.props;
export type CardHeaderEvents = typeof __propDef.events;
export type CardHeaderSlots = typeof __propDef.slots;
export default class CardHeader extends SvelteComponent<CardHeaderProps, CardHeaderEvents, CardHeaderSlots> {
}
export {};
