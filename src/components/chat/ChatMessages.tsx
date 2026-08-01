import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

export interface Message {
    role: "user" | "assistant";
    content: string;
}

interface Props {
    messages: Message[];
    isLoading?: boolean;
}

// 1. Destructure `isLoading` from props
export default function ChatMessages({ messages, isLoading }: Props) {
    return (
        <div className="space-y-4">
            {messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    role={message.role}
                    content={message.content}
                />
            ))}

            {/* 2. Render TypingIndicator when isLoading is true */}
            {isLoading && <TypingIndicator />}
        </div>
    );
}