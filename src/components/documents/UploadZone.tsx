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
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 hover:border-blue-500"
                }
            `}
        >
            <input {...getInputProps()} />

            <UploadCloud
                size={52}
                className="mb-5 text-blue-500"
            />

            <h3 className="text-xl font-semibold">
                Drop files here
            </h3>

            <p className="mt-2 text-slate-400">
                or click to browse
            </p>

            <p className="mt-6 text-center text-sm text-slate-500">
                PDF • DOCX • XLSX • CSV • TXT • MD • HTML • PNG • JPG
            </p>
        </div>
    );
}