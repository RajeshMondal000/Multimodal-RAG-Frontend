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
            rounded-full
            border
            border-neutral-800
            bg-neutral-900
            px-5
            py-3
            text-neutral-100
            placeholder-neutral-500
            focus:border-neutral-700
            focus:outline-none
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
                    rounded-full
            bg-white
            px-6
            py-3
            font-medium
            text-neutral-950
            transition-colors
            hover:bg-neutral-200
            disabled:cursor-not-allowed
            disabled:opacity-40
                "
            >
                Send
            </button>

        </div>

    );

}