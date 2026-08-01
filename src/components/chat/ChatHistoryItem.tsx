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
                className={`w-full text-left cursor-pointer rounded-xl border p-3 transition-all duration-200
                ${selected
                        ? "border-blue-500 bg-slate-800"
                        : "border-slate-700 bg-slate-900 hover:border-slate-600 hover:bg-slate-800"
                    }`}
            >
                <div className="flex items-center gap-2">
                    <MessageSquare size={16} />

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                            {chat.title}
                        </p>

                        <p className="text-xs text-slate-400">
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
            rounded
            p-1
            text-slate-400
            hover:bg-red-500/10
            hover:text-red-500
        "
    >
        <Trash2 size={16}/>
    </button>
        </div>
    );
}