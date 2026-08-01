import { useState } from "react";

interface ChatInputProps {
    onSend: (message: string) => Promise<void>;
    disabled?: boolean;
}

export default function ChatInput({
    onSend,
    disabled,
}: ChatInputProps) {

    const [message, setMessage] = useState("");

    async function handleSend() {

        if (!message.trim()) return;

        const question = message;

        setMessage("");

        try {

            await onSend(question);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="flex gap-3">

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something..."
                disabled={disabled}
                className="
                    flex-1
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    px-4
                    py-3
                "
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                    }
                }}
            />

            <button
                onClick={handleSend}
                disabled={disabled}
                className="
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    disabled:opacity-50
                "
            >
                Send
            </button>

        </div>

    );

}