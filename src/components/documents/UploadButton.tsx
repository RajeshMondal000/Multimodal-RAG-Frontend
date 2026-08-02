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
                bg-blue-600
                px-4
                py-2
                font-medium
                text-white
                transition
                hover:bg-blue-500
            "
        >
            <Upload size={18} />

            Upload Files
        </button>
    );
}