interface UploadProgressProps {

    progress: number;

    status: string;

}

export default function UploadProgress({
    progress,
    status,
}: UploadProgressProps) {

    return (

        <div className="mt-6 space-y-3">

            <div className="flex justify-between text-sm">

                <span>{status}</span>

                <span>{progress}%</span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-700">

                <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-200"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

        </div>

    );

}