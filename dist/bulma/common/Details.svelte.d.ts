import { SvelteComponent } from "svelte";
import { type BulmaHelper } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        title: string;
        value: string;
        bulma?: BulmaHelper | undefined;
        bulmaTitle?: BulmaHelper | undefined;
        bulmaSubtitle?: BulmaHelper | undefined;
        underlined?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DetailsProps = typeof __propDef.props;
export type DetailsEvents = typeof __propDef.events;
export type DetailsSlots = typeof __propDef.slots;
export default class Details extends SvelteComponent<DetailsProps, DetailsEvents, DetailsSlots> {
}
export {};
