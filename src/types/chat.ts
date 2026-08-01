export interface Chat {

    id: string;

    title: string;

    documentCount: number;

    updatedAt: string;

    selected: boolean;

}


export interface Message {
    role: "user" | "assistant";
    content: string;
}

export interface ChatSession {
    id: string;

    documentId: string;

    title: string;

    messages: Message[];

    createdAt: string;

    updatedAt: string;
}