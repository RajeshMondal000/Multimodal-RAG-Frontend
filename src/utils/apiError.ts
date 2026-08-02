import axios from "axios";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function extractErrorMessage(value: unknown): string | null {

    if (typeof value === "string") {

        // Try to parse JSON strings returned by APIs
        try {

            const parsed = JSON.parse(value);

            const nested = extractErrorMessage(parsed);

            if (nested) {
                return nested;
            }

        } catch {
            // Not JSON
        }

        return value.trim() || null;

    }

    if (!isRecord(value)) {
        return null;
    }

    // Prefer actual message fields
    for (const key of ["message", "detail", "details", "title"]) {

        const nested = extractErrorMessage(value[key]);

        if (nested) {
            return nested;
        }

    }

    // Then recursively inspect the error object
    if ("error" in value) {

        const nested = extractErrorMessage(value.error);

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