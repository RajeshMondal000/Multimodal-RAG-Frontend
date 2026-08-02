import { useState } from "react";
import {
    getJobProgress,
    uploadDocuments,
} from "../services/documentService";
import { getErrorMessage } from "../utils/apiError";

export function useUpload() {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");
    const [stage, setStage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    async function upload(files: File[]) {
        try {
            setUploading(true);
            setProgress(0);
            setUploadProgress(0);
            setProcessingProgress(0);
            setStatus("Uploading files...");
            setStage("uploading");
            setError(null);

            const result = await uploadDocuments(
                files,
                (value) => {
                    setUploadProgress(value);
                    // Upload occupies first 20% of the bar
                    setProgress(Math.round(value * 0.2));
                    setStatus("Uploading file...");
                    setStage("uploading");
                }
            );

            const jobId = result[0].jobId;

            while (true) {
                const job = await getJobProgress(jobId);

                setProcessingProgress(job.progress);

                // Processing occupies the remaining 80% (20% -> 100%)
                setProgress(
                    20 + Math.round(job.progress * 0.8)
                );

                setStatus(job.message);
                setStage(job.stage);

                if (
                    job.stage === "complete" ||
                    job.stage === "failed"
                ) {
                    if (job.stage === "failed") {
                        setError(job.message || "Processing failed");
                    }
                    break;
                }

                await new Promise((resolve) =>
                    setTimeout(resolve, 1000)
                );
            }

            return result;
        } catch (err) {

            setError(
                getErrorMessage(err, "Upload failed")
            );

            throw err;

        } finally {
            setUploading(false);

        }
    }

    return {
        upload,
        uploading,

        progress,

        uploadProgress,

        processingProgress,

        status,

        stage,

        error,
    };
}