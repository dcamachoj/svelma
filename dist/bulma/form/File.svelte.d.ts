import { SvelteComponent } from "svelte";
import type { BulmaHelper, FileItem, Colors, BwColors, InputSize, FieldAlign } from '../../utils/bulma.js';
declare const __propDef: {
    props: {
        bulma?: BulmaHelper | undefined;
        id: string;
        icon?: string | undefined;
        accept?: string | undefined;
        color?: Colors | BwColors | undefined;
        size?: InputSize | undefined;
        check?: ModalCheck<FileItem> | undefined;
        align?: FieldAlign | undefined;
        file: File | undefined;
        hasName?: boolean | undefined;
        isRight?: boolean | undefined;
        isFullWidth?: boolean | undefined;
        isBoxed?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type FileProps = typeof __propDef.props;
export type FileEvents = typeof __propDef.events;
export type FileSlots = typeof __propDef.slots;
export default class File extends SvelteComponent<FileProps, FileEvents, FileSlots> {
}
export {};
