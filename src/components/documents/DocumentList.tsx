import DocumentCard from "./DocumentCard";

import { useDocuments } from "../../contexts/DocumentContext";

export default function DocumentList() {

    const {
        documents,
        loading,
        selectDocument,
        removeDocument,
    } = useDocuments();

    if (loading) {

        return (

            <p className="text-sm text-neutral-400">

                Loading documents...

            </p>

        );

    }

    if (documents.length === 0) {

        return (

            <p className="text-sm text-slate-400">

                No files uploaded.

            </p>

        );

    }

    return (

        <div className="space-y-3">

            {documents.map((doc) => (

                <DocumentCard
                    key={doc.id}
                    document={doc}
                    onClick={() => selectDocument(doc.id)}
                    onDelete={() => {
                        if (window.confirm(`Delete "${doc.name}"?`)) {
                            removeDocument(doc.id);
                        }
                    }}
                />

            ))}

        </div>

    );

}