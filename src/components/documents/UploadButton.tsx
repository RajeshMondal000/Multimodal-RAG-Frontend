import { Upload } from "lucide-react";

interface UploadButtonProps {
    onClick: () => void;
}

export default function UploadButton({
    onClick,
}: UploadButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
                flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-full
        bg-neutral-800
        border
        border-neutral-700/50
        px-4
        py-2.5
        text-sm
        font-medium
        text-neutral-200
        transition-colors
        hover:bg-neutral-700
        hover:text-white
            "
        >
            <Upload size={18} />

            Upload Files
        </button>
    );
}