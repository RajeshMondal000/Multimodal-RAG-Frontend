import api from "../lib/api.ts";

export interface ChatRequest {
    documentId: string;
    question: string;
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
    request: ChatRequest
): Promise<ChatResponse> {

    const response = await api.post<ChatResponse>(
        "/chat",
        request
    );

    return response.data;

}