import type { ChatSession } from "../types/chat";

const CHAT_STORAGE_KEY = "rag-chat-history";
const CURRENT_CHAT_KEY = "rag-current-chat";

export function loadChats(): ChatSession[] | null {

    try {

        const stored = localStorage.getItem(CHAT_STORAGE_KEY);

        if (!stored) {

            return null;

        }

        return JSON.parse(stored);

    } catch (error) {

        console.error("Failed to load chats:", error);

        return null;

    }

}

export function saveChats(
    chats: ChatSession[]
): void {

    try {

        localStorage.setItem(
            CHAT_STORAGE_KEY,
            JSON.stringify(chats)
        );

    } catch (error) {

        console.error("Failed to save chats:", error);

    }

}

export function loadCurrentChat(): string | null {

    return localStorage.getItem(CURRENT_CHAT_KEY);

}

export function saveCurrentChat(
    id: string
): void {

    localStorage.setItem(
        CURRENT_CHAT_KEY,
        id
    );

}

export function clearChatStorage(): void {

    localStorage.removeItem(CHAT_STORAGE_KEY);

    localStorage.removeItem(CURRENT_CHAT_KEY);

}