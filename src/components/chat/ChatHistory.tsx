import { useChat } from "../../contexts/ChatContext";
import { useDocuments } from "../../contexts/DocumentContext";
import ChatHistoryItem from "./ChatHistoryItem";

export default function ChatHistory() {
    const {
        getChatsForDocument,
        currentChat,
        selectChat,
        deleteChat,
    } = useChat();
    const { selectedDocument } = useDocuments();

    // Retrieve chats belonging specifically to the selected document
    const documentChats = selectedDocument
        ? getChatsForDocument(selectedDocument.id)
        : [];

    if (documentChats.length === 0) {
        return (
            <p className="px-2 text-sm text-slate-400">
                No chats yet
            </p>
        );
    }

    return (
        <div>
            {/* Heading showing document-specific chat count */}
            <h3 className="mb-3 text-sm font-semibold text-slate-400">
                File Specific Chats ({documentChats.length})
            </h3>

            {/* List rendered with newest document chats first */}
            <div className="space-y-2">
                {[...documentChats].reverse().map((chat) => (
                    <ChatHistoryItem
                        key={chat.id}
                        chat={chat}
                        selected={chat.id === currentChat?.id}
                        onClick={() => selectChat(chat.id)}
                        onDelete={() => deleteChat(chat.id)}
                    />
                ))}
            </div>
        </div>
    );
}