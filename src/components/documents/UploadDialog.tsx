import { useState } from "react";
import UploadZone from "./UploadZone";
import UploadProgress from "./UploadProgress";
import { useUpload } from "../../hooks/useUpload";
import { useDocuments } from "../../contexts/DocumentContext";
import ErrorAlert from "../common/ErrorAlert";

interface UploadDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function UploadDialog({
    open,
    onClose,
}: UploadDialogProps) {
    const [files, setFiles] = useState<File[]>([]);
    const { upload, uploading, progress, error, status } = useUpload();
    const { refresh } = useDocuments();

    if (!open) return null;

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/70
                backdrop-blur-sm
            "
        >
            <div
                className="
                    w-full
                    max-w-2xl
                    rounded-2xl
                    bg-slate-900
                    p-8
                    shadow-xl
                "
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                        Upload Documents
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-slate-400 hover:text-white"
                    >
                        ×
                    </button>
                </div>

                <UploadZone
                    onFilesSelected={(selectedFiles) => {
                        setFiles(selectedFiles);
                    }}
                />

                {files.length > 0 && (
                    <div className="mt-6 space-y-2">
                        <h3 className="font-medium">
                            Selected Files
                        </h3>

                        {files.map((file) => (
                            <div
                                key={file.name}
                                className="
                                    rounded-lg
                                    border
                                    border-slate-700
                                    bg-slate-800
                                    p-3
                                "
                            >
                                <div className="flex justify-between">
                                    <span>{file.name}</span>

                                    <span className="text-slate-400">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {uploading && (
                    <UploadProgress progress={progress} status={status} />
                )}

                {error && (
                    <div className="mt-3">
                        <ErrorAlert
                            title="Upload Failed"
                            message={error}
                        />
                    </div>
                )}

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="
                            rounded-lg
                            border
                            border-slate-700
                            px-5
                            py-2
                            hover:bg-slate-800
                        "
                    >
                        Cancel
                    </button>

                    <button
                        disabled={files.length === 0 || uploading}
                        onClick={async () => {
                            try {
                                await upload(files);
                                await refresh();
                                setFiles([]);
                                onClose();
                            } catch {
                                // Error handled by useUpload state
                            }
                        }}
                        className="
                            rounded-lg
                            bg-blue-600
                            px-5
                            py-2
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            hover:bg-blue-500
                        "
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
}