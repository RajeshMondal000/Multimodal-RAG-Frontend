import api from "../libb/api.ts";

export interface ChatRequest {
    documentId: string;
    question: string;
    useGeneralKnowledge: boolean;
}

export interface ChatSource {
    page: number;
    score: number;
    index: number;
}

export interface ChatResponse {
    success: boolean;
    documentId: string;
    question: string;
    answer: string;
    sources: ChatSource[];
}

export async function sendMessage(
    question: string,
    documentId: string,
    useGeneralKnowledge: boolean
): Promise<ChatResponse> {
    const response = await api.post<ChatResponse>(
        "/chat",
        {
            question,
            documentId,
            useGeneralKnowledge,
        }
    );

    return response.data;
}