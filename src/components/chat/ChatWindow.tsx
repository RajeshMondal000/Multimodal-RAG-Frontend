import { useState } from "react";

import { useDocuments } from "../../contexts/DocumentContext";
import { useChat } from "../../contexts/ChatContext";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

import { sendMessage } from "../../services/chat";

export default function ChatWindow() {
    const { currentChat, messages, addMessage, updateTitle, } = useChat();
    const { selectedDocument } = useDocuments();

    const [loading, setLoading] = useState(false);

    if (!selectedDocument) {
        return (
            <div className="flex flex-1 items-center justify-center text-slate-400">
                Select a document from the sidebar to start chatting.
            </div>
        );
    }

    async function handleSend(question: string) {
        if (!selectedDocument) return;

        // Capture target chat ID for asynchronous operations
        const chatId = currentChat!.id;

        setLoading(true);

        if (messages.length === 0) {
            const title =
                question.length > 40
                    ? question.slice(0, 40) + "..."
                    : question;

            updateTitle(chatId, title);
        }

        // Show user's message immediately
        addMessage(chatId, {
            role: "user",
            content: question,
        });

        try {
            const response = await sendMessage({
                documentId: selectedDocument.id,
                question,
            });

            // Add assistant response to the originating chat
            addMessage(chatId, {
                role: "assistant",
                content: response.answer,
            });
        } catch (error) {
            console.error(error);

            addMessage(chatId, {
                role: "assistant",
                content: "Something went wrong while generating the response.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-full flex-1 flex-col">

            {/* Header */}
            <div className="border-b border-slate-800 px-8 py-5">
                <h2 className="text-xl font-semibold">
                    {selectedDocument.name}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    Ask questions about this document.
                </p>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-8">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-slate-500">
                        Start by asking a question about this document.
                    </div>
                ) : (
                    <ChatMessages messages={messages} isLoading={loading}/>
                )}
            </div>

            {/* Input */}
            <div className="border-t border-slate-800 p-6">
                <ChatInput
                    onSend={handleSend}
                    disabled={loading}
                />
            </div>

        </div>
    );
}