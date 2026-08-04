import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadZoneProps {
    onFilesSelected: (files: File[]) => void;
}

export default function UploadZone({
    onFilesSelected,
}: UploadZoneProps) {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: true,

        onDrop: (acceptedFiles) => {
            onFilesSelected(acceptedFiles);
        },
    });

    return (
        <div
            {...getRootProps()}
            className={`
                flex
                h-72
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                p-10
                transition-all

                ${
                    isDragActive
                        ? "border-neutral-400 bg-neutral-800/50"
                        : "border-neutral-700 hover:border-neutral-500 bg-neutral-900/40"
                }
            `}
        >
            <input {...getInputProps()} />

            <UploadCloud
                size={52}
                className="mb-5 text-neutral-300"
            />

            <h3 className="text-xl font-semibold text-neutral-200">
                Drop files here
            </h3>

            <p className="mt-2 text-neutral-400">
                or click to browse
            </p>

            <p className="mt-6 text-center text-sm text-neutral-500">
                PDF • DOCX • XLSX • CSV • TXT • MD • HTML • PNG • JPG
            </p>
        </div>
    );
}