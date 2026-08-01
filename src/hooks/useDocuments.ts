import { useEffect, useState } from "react";
import type { Document } from "../types/document";
import {
    getDocuments,
    type DocumentResponse,
} from "../services/documentService";

export function useDocuments() {

    const [documents, setDocuments] =
        useState<Document[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function refresh() {

        setLoading(true);

        try {

            const docs =
                await getDocuments();

            setDocuments(docs);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        refresh();

    }, []);

    return {

        documents,

        loading,

        refresh,

    };

}