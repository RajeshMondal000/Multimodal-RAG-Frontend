import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    getDocuments,
    deleteDocument,
} from "../services/documentService";

import type { Document } from "../types/document";

interface DocumentContextType {
    documents: Document[];
    loading: boolean;

    selectedDocument: Document | null;

    selectDocument: (id: string) => void;

    removeDocument: (id: string) => Promise<void>;

    refresh: () => Promise<void>;
}

const DocumentContext = createContext<DocumentContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function DocumentProvider({ children }: Props) {

    const [selectedDocument, setSelectedDocument] =
        useState<Document | null>(null);

    const [documents, setDocuments] =
        useState<Document[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function refresh() {

        setLoading(true);

        try {

            const docs = await getDocuments();

            setDocuments(
                docs.map(doc => ({
                    ...doc,
                    selected: selectedDocument?.id === doc.id,
                }))
            );

            if (selectedDocument) {

                const latest =
                    docs.find(
                        d => d.id === selectedDocument.id
                    ) ?? null;

                setSelectedDocument(latest);

            }

        } finally {

            setLoading(false);

        }

    }

    function selectDocument(id: string) {

        const updated = documents.map(doc => ({
            ...doc,
            selected: doc.id === id,
        }));

        setDocuments(updated);

        setSelectedDocument(
            updated.find(doc => doc.id === id) ?? null
        );

    }

    async function removeDocument(id: string) {

        await deleteDocument(id);

        await refresh();

        if (selectedDocument?.id === id) {

            setSelectedDocument(null);

        }

    }

    useEffect(() => {

        refresh();

    }, []);

    return (

        <DocumentContext.Provider
            value={{
                documents,
                loading,
                refresh,
                selectedDocument,
                selectDocument,
                removeDocument,
            }}
        >
            {children}
        </DocumentContext.Provider>

    );

}
export function useDocuments() {

    const context = useContext(DocumentContext);

    if (!context) {
        throw new Error(
            "useDocuments must be used inside DocumentProvider"
        );
    }

    return context;

}