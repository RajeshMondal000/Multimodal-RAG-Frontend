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
                rounded-lg
                bg-neutral-800
                px-4
                py-2
                font-medium
                text-white
                transition
                hover:bg-neutral-700
            "
        >
            <Upload size={18} />

            Upload Files
        </button>
    );
}