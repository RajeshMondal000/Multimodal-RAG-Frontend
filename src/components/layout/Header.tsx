import { Settings } from "lucide-react";

export default function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">

            <div>
                <h1 className="text-lg font-semibold">
                    MultiModal RAG Assistant
                </h1>

                <p className="text-sm text-slate-400">
                    Chat with documents and images.
                </p>
            </div>

            <button
                className="rounded-lg p-2 transition hover:bg-slate-800"
            >
                <Settings size={20} />
            </button>

        </header>
    );
}