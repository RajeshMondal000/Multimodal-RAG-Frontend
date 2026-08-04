import { useState } from "react";

import ChatHistory from "../chat/ChatHistory";
import DocumentList from "../documents/DocumentList";
import UploadButton from "../documents/UploadButton";
import UploadDialog from "../documents/UploadDialog";
import { useChat } from "../../contexts/ChatContext";
import { useDocuments } from "../../contexts/DocumentContext";

export default function Sidebar() {
    const { newChat } = useChat();
    const { selectedDocument } = useDocuments();
    const [showUpload, setShowUpload] = useState(false);

    function handleNewChat() {
        if (selectedDocument) {
            newChat(selectedDocument.id);
        }
    }

    return (
        <>
            <aside className="flex h-screen w-80 flex-col border-r border-neutral-800/40 bg-neutral-900 text-neutral-300">

                {/* Top Section / Header */}
                <div className="border-b border-neutral-800 p-5">
                    <h2 className="mb-4 text-lg font-semibold">
                        Files
                    </h2>

                    <UploadButton
                        onClick={() => setShowUpload(true)}
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 flex-col overflow-hidden p-5">

                    {/* Document List (Fixed / Max height scroll if needed) */}
                    <div className="max-h-48 overflow-y-auto">
                        <DocumentList />
                    </div>

                    {/* Chat History Section Wrapper */}
                    <div className="mt-6 flex flex-1 flex-col overflow-hidden border-t border-neutral-800 pt-6">

                        <button
                            onClick={handleNewChat}
                            disabled={!selectedDocument}
                            className="mb-4 w-full rounded-full bg-neutral-800 border border-neutral-700/50 py-2.5 px-4 text-sm font-medium text-white hover:bg-neutral-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-80"
                        >
                            + New Chat
                        </button>

                        {/* Scrollable Chat History Container */}
                        <div className="flex-1 overflow-y-auto">
                            <ChatHistory />
                        </div>

                    </div>

                </div>

            </aside>

            <UploadDialog
                open={showUpload}
                onClose={() => setShowUpload(false)}
            />
        </>
    );
}