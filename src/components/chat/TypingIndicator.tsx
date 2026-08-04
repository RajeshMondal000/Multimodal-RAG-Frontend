
export default function TypingIndicator() {
    return (
        <div className="flex w-fit items-center space-x-2 rounded-full bg-neutral-800/80 px-4 py-2.5 text-neutral-400 border border-neutral-700/40">
            <span className="text-xs font-medium text-neutral-400">Thinking</span>
            <div className="flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce" />
            </div>
        </div>
    );
}