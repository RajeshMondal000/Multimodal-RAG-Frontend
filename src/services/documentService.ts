import type { Document } from "../types/document";
import api from "../libb/api";
import type { AxiosProgressEvent } from "axios";

export interface UploadResponse {
    success: boolean;
    jobId: string;
    documentId: string;
    fileName: string;
    uploadedAt: string;
    chunks: number;
}
export interface DocumentResponse {
    documentId: string;
    fileName: string;
    type: string;
    uploadedAt: string;
    chunks: number;
}

export interface JobProgress {
    stage: string;
    progress: number;
    message: string;
    processedChunks?: number;
    totalChunks?: number;
}
interface GetDocumentsResponse {
    success: boolean;
    documents: DocumentResponse[];
}

export async function getDocuments(): Promise<Document[]> {

    const response =
        await api.get<GetDocumentsResponse>("/documents");

    return response.data.documents.map((doc: DocumentResponse) => {

        const extension =
            doc.fileName.split(".").pop()?.toLowerCase() ?? "";

        let type = "pdf";

        if (["png", "jpg", "jpeg", "webp"].includes(extension)) {
            type = "image";
        } else if (["csv", "xlsx"].includes(extension)) {
            type = extension;
        }

        return {
            id: doc.documentId,
            name: doc.fileName,
            type,
            uploadedAt: new Date(doc.uploadedAt).toLocaleDateString(),

            chunks: doc.chunks,

            status: "ready",

            selected: false,
        };
    });

}
export async function getJobProgress(
    jobId: string
): Promise<JobProgress> {

    const response = await api.get<JobProgress>(
        `/upload/jobs/${jobId}`
    );

    return response.data;
}

export async function uploadDocuments(
    files: File[],
    onProgress?: (progress: number) => void
): Promise<UploadResponse[]> {

    const responses: UploadResponse[] = [];

    for (let i = 0; i < files.length; i++) {

        const formData = new FormData();

        formData.append("file", files[i]);

        const response = await api.post<UploadResponse>(
            "/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },

                onUploadProgress(progressEvent :AxiosProgressEvent) {

                    if (!progressEvent.total) return;

                    const currentFileProgress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );

                    const overallProgress = Math.round(
                        ((i + currentFileProgress / 100) / files.length) * 100
                    );

                    onProgress?.(overallProgress);
                },
            }
        );

        responses.push(response.data);
    }

    return responses;
}

export async function deleteDocument(
    documentId: string
): Promise<void> {

    await api.delete(`/documents/${documentId}`);

}