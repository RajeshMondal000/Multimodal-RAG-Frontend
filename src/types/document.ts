export type DocumentStatus =
    | "processing"
    | "ready"
    | "failed";

export interface Document {

    id: string;

    name: string;

    type: string;

    uploadedAt: string;

    status: DocumentStatus;

    selected: boolean;

    pages?: number;

    chunks?: number;

}