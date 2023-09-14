import { SvelteComponent } from "svelte";
import { type BulmaHelper, type OlType } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        type?: OlType | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type OlProps = typeof __propDef.props;
export type OlEvents = typeof __propDef.events;
export type OlSlots = typeof __propDef.slots;
export default class Ol extends SvelteComponent<OlProps, OlEvents, OlSlots> {
}
export {};
