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
    const { addDocument, refresh, selectDocument } = useDocuments();

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
                    w-full max-w-2xl rounded-2xl border border-neutral-800 bg-[#1e1e1e] p-8 shadow-2xl text-neutral-200
                "
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                        Upload Files
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
                                    rounded-lg border border-neutral-700/60 bg-neutral-800/50 p-3
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
                            rounded-full border border-neutral-700 px-5 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white
                        "
                    >
                        Cancel
                    </button>

                    <button
                        disabled={files.length === 0 || uploading}
                        onClick={async () => {
                            try {
                                const result = await upload(files);
                                const uploaded = result[0];

                                if (!uploaded?.documentId) {
                                    throw new Error("Upload did not return a document ID.");
                                }

                                addDocument({
                                    id: uploaded.documentId,
                                    name: uploaded.fileName,
                                    uploadedAt: uploaded.uploadedAt,
                                    status: "ready",
                                    type: uploaded.fileName.split(".").pop() ?? "document",
                                    selected: false,
                                });

                                selectDocument(uploaded.documentId);

                                setFiles([]);
                                onClose();

                                window.setTimeout(() => {
                                    void refresh();
                                }, 3000);
                            } catch {
                                // Error handled by useUpload state
                            }
                        }}
                        className="
                            rounded-full bg-white px-6 py-2 font-medium text-neutral-950 transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40
                        "
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
}