
export default function TypingIndicator() {
    return (
        <div className="flex w-fit items-center space-x-2 rounded-2xl bg-slate-800/80 px-4 py-3 text-slate-400 border border-slate-700/50">
            <span className="text-xs font-medium text-slate-400">Thinking</span>
            <div className="flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
            </div>
        </div>
    );
}