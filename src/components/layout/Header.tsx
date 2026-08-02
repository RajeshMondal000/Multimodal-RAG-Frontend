import { useSettings } from "../../contexts/SettingsContext";

export default function Header() {
    const {
        useGeneralKnowledge,
        setUseGeneralKnowledge,
    } = useSettings();

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

            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-300">
                    {useGeneralKnowledge ? "Document+ AI" : "Document only"}
                </span>

                <button
                    onClick={() => setUseGeneralKnowledge(!useGeneralKnowledge)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        useGeneralKnowledge ? "bg-blue-600" : "bg-slate-700"
                    }`}
                    role="switch"
                    aria-checked={useGeneralKnowledge}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            useGeneralKnowledge ? "translate-x-6" : "translate-x-1"
                        }`}
                    />
                </button>
            </div>
        </header>
    );
}