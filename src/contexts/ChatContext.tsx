import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { useDocuments } from "./DocumentContext"; 
import type {
    ChatSession,
    Message,
} from "../types/chat";

import {
    loadChats,
    saveChats,
} from "../utils/chatStorage";

interface ChatContextType {

    chats: ChatSession[];

    currentChat: ChatSession | null;

    messages: Message[];

    currentChatId: string | null;

    getChatsForDocument: (
        documentId: string
    ) => ChatSession[];

    openDocument: (
        documentId: string
    ) => void;

    newChat: (
        documentId: string
    ) => void;

    selectChat: (
        chatId: string
    ) => void;

    deleteChat: (
        chatId: string
    ) => void;

    addMessage: (
        chatId: string,
        message: Message
    ) => void;

    updateTitle: (
        chatId: string,
        title: string
    ) => void;
}

const ChatContext =
    createContext<ChatContextType | null>(null);

interface Props {
    children: ReactNode;
}

function createChat(
    documentId: string
): ChatSession {

    const now =
        new Date().toISOString();

    return {
        id: crypto.randomUUID(),

        documentId,

        title: "New Chat",

        messages: [],

        createdAt: now,

        updatedAt: now,
    };

}

export function ChatProvider({
    children,
}: Props) {

    const { selectedDocument } = useDocuments();
    
    const [chats, setChats] =
        useState<ChatSession[]>(
            loadChats() ?? []
        );

    const [
        currentChatId,
        setCurrentChatId,
    ] = useState<string | null>(null);

    useEffect(() => {

        saveChats(chats);

    }, [chats]);

    const currentChat =
        chats.find(
            chat =>
                chat.id === currentChatId
        ) ?? null;

    function getChatsForDocument(
        documentId: string
    ) {

        return chats
            .filter(
                chat =>
                    chat.documentId ===
                    documentId
            )
            .sort(
                (a, b) =>
                    new Date(
                        b.updatedAt
                    ).getTime() -
                    new Date(
                        a.updatedAt
                    ).getTime()
            );

    }

    function openDocument(
        documentId: string
    ) {

        const documentChats =
            getChatsForDocument(
                documentId
            );

        if (
            documentChats.length === 0
        ) {

            const chat =
                createChat(
                    documentId
                );

            setChats(previous => [
                ...previous,
                chat,
            ]);

            setCurrentChatId(
                chat.id
            );

            return;

        }

        setCurrentChatId(
            documentChats[0].id
        );

    }

    useEffect(() => {
        if (selectedDocument?.id) {
            openDocument(selectedDocument.id);
        }
    }, [selectedDocument?.id]);

    function newChat(
        documentId: string
    ) {

        const existingEmpty =
            chats.find(
                chat =>
                    chat.documentId ===
                        documentId &&
                    chat.messages
                        .length === 0
            );

        if (existingEmpty) {

            setCurrentChatId(
                existingEmpty.id
            );

            return;

        }

        const chat =
            createChat(
                documentId
            );

        setChats(previous => [
            ...previous,
            chat,
        ]);

        setCurrentChatId(chat.id);

    }

    function selectChat(
        id: string
    ) {

        setCurrentChatId(id);

    }

    function deleteChat(
        id: string
    ) {

        const deleted =
            chats.find(
                c => c.id === id
            );

        if (!deleted) return;

        const remaining =
            chats.filter(
                c => c.id !== id
            );

        setChats(remaining);

        const documentChats =
            remaining.filter(
                c =>
                    c.documentId ===
                    deleted.documentId
            );

        if (
            currentChatId === id
        ) {

            if (
                documentChats.length
            ) {

                setCurrentChatId(
                    documentChats[0].id
                );

            } else {

                const chat =
                    createChat(
                        deleted.documentId
                    );

                setChats(prev => [
                    ...prev,
                    chat,
                ]);

                setCurrentChatId(
                    chat.id
                );

            }

        }

    }

    function addMessage(
        chatId: string,
        message: Message
    ) {

        const now =
            new Date().toISOString();

        setChats(previous =>
            previous.map(chat =>
                chat.id === chatId
                    ? {
                          ...chat,
                          updatedAt:
                              now,
                          messages: [
                              ...chat.messages,
                              message,
                          ],
                      }
                    : chat
            )
        );

    }

    function updateTitle(
        chatId: string,
        title: string
    ) {

        setChats(previous =>
            previous.map(chat =>
                chat.id === chatId
                    ? {
                          ...chat,
                          title,
                      }
                    : chat
            )
        );

    }

    const value =
        useMemo(
            () => ({
                chats,

                currentChat,

                currentChatId,

                messages:
                    currentChat
                        ?.messages ??
                    [],

                getChatsForDocument,

                openDocument,

                newChat,

                selectChat,

                deleteChat,

                addMessage,

                updateTitle,
            }),
            [
                chats,
                currentChat,
            ]
        );

    return (
        <ChatContext.Provider
            value={value}
        >
            {children}
        </ChatContext.Provider>
    );

}

export function useChat() {

    const context =
        useContext(ChatContext);

    if (!context) {

        throw new Error(
            "useChat must be used inside ChatProvider"
        );

    }

    return context;

}