import { MessageSquare } from "lucide-react";
import { Trash2 } from "lucide-react";
import { type ChatSession } from "../../types/chat";

interface Props {
    chat: ChatSession;
    selected: boolean;
    onClick: () => void;
    onDelete: () => void;
}

export default function ChatHistoryItem({ chat, selected, onClick, onDelete }: Props) {
    return (
        <div className="flex gap-2">
            <button
                onClick={onClick}
                className={`w-full cursor-pointer text-left transition-all duration-200 rounded-full px-4 py-3 border
                ${selected
                        ? "bg-neutral-800 border-neutral-700 text-white"
                        : "bg-transparent border-transparent text-neutral-300 hover:bg-neutral-800/50"
                    }`}
            >
                <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-neutral-400"/>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                            {chat.title}
                        </p>

                        <p className="text-xs text-neutral-400">
                            {chat.messages.length} messages
                        </p>
                    </div>
                </div>
            </button>

            <button
        onClick={(e) => {

            e.stopPropagation();

            if (
                window.confirm(
                    `Delete "${chat.title}"?`
                )
            ) {

                onDelete();

            }

        }}
        className="
            rounded-full p-2 text-neutral-400 hover:bg-red-500/10 hover:text-red-400 transition-colors
        "
    >
        <Trash2 size={16}/>
    </button>
        </div>
    );
}