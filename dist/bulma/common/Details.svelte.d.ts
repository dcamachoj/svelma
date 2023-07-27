import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        title: string;
        value: string;
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
