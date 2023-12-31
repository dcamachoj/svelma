import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        active: boolean;
        header: string;
        accept?: string | undefined;
        progress?: number | undefined;
        check?: app.ModalCheck<app.FileItem> | undefined;
    };
    events: {
        select: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type FileUploadModalProps = typeof __propDef.props;
export type FileUploadModalEvents = typeof __propDef.events;
export type FileUploadModalSlots = typeof __propDef.slots;
export default class FileUploadModal extends SvelteComponent<FileUploadModalProps, FileUploadModalEvents, FileUploadModalSlots> {
}
export {};
