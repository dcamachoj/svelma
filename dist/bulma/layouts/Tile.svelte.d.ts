import { SvelteComponent } from "svelte";
import type { BulmaHelper, TileSize } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        className?: any;
        size?: TileSize | undefined;
        isAncestor?: boolean | undefined;
        isParent?: boolean | undefined;
        isChild?: boolean | undefined;
        isVertical?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TileProps = typeof __propDef.props;
export type TileEvents = typeof __propDef.events;
export type TileSlots = typeof __propDef.slots;
export default class Tile extends SvelteComponent<TileProps, TileEvents, TileSlots> {
}
export {};
