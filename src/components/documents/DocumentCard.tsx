import {
    FileSpreadsheet,
    FileText,
    Image,
    Trash2,
} from "lucide-react";


import type { Document } from "../../types/document";

interface Props {
    document: Document;
    onClick: () => void;
    onDelete: () => void;
}

export default function DocumentCard({
    document,
    onClick,
    onDelete,
}: Props) {

    const icon = (() => {

        switch (document.type) {

            case "xlsx":
            case "csv":
                return <FileSpreadsheet size={18} />;

            case "image":
                return <Image size={18} />;

            default:
                return <FileText size={18} />;

        }

    })();

    return (

        <div
            onClick={onClick}
            className={`
                cursor-pointer
                rounded-xl
                border
                p-3
                transition

                ${document.selected
                    ? "border-neutral-700 bg-neutral-800 text-white"
                    : "border-neutral-800/80 bg-neutral-900/50 hover:bg-neutral-800/60 text-neutral-300"
                }
            `}
        >

            <div className="flex items-center justify-between">

                <div className="flex min-w-0 items-center gap-2">

                    {icon}

                    <p className="truncate text-sm font-medium">

                        {document.name}

                    </p>

                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="
            rounded-md
            p-1
            text-slate-400
            transition
            hover:bg-red-500/10
            hover:text-red-500
        "
                    title="Delete document"
                >
                    <Trash2 size={16} />
                </button>

            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">

                <span>{document.uploadedAt}</span>

                <span>

                    {document.status}

                </span>

            </div>

        </div>

    );

}