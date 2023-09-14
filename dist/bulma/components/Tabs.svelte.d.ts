import { SvelteComponent } from "svelte";
import type { BulmaHelper, Action, TabsAlign, TabsSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        tabs: Action[];
        align?: TabsAlign | undefined;
        size?: TabsSize | undefined;
        isBoxed?: boolean | undefined;
        isToggle?: boolean | undefined;
        isToggleRounded?: boolean | undefined;
        isFullWidth?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TabsProps = typeof __propDef.props;
export type TabsEvents = typeof __propDef.events;
export type TabsSlots = typeof __propDef.slots;
export default class Tabs extends SvelteComponent<TabsProps, TabsEvents, TabsSlots> {
}
export {};
