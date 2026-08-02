import axios from "axios";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function extractErrorMessage(value: unknown): string | null {
    if (typeof value === "string") {
        return value.trim() || null;
    }

    if (!isRecord(value)) {
        return null;
    }

    for (const key of ["message", "title", "error", "details", "detail"]) {
        const nested = extractErrorMessage(value[key]);

        if (nested) {
            return nested;
        }
    }

    return null;
}

export function getErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            return error.message || fallback;
        }

        return extractErrorMessage(error.response.data) ?? fallback;
    }

    return extractErrorMessage(error) ?? fallback;
}