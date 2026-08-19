export function createAbortSignal(timeout?: number): AbortSignal | undefined {
    if (!timeout) {
        return undefined;
    }

    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller.signal;
}

export function buildSearchParams(
    params?: Record<string, string | string[] | number | boolean | null | undefined>
): URLSearchParams {
    const searchParams = new URLSearchParams();

    if (!params) {
        return searchParams;
    }

    Object.entries(params).forEach(([key, value]) => {
        if (value == null) {
            return;
        }

        (Array.isArray(value) ? value : [value]).forEach((v) => {
            searchParams.append(key, String(v));
        });
    });

    return searchParams;
}

export function getTokenExpiration(token: string): number {
    try {
        const jwt = token.replace('Bearer ', '');
        const payload = JSON.parse(atob(jwt.split('.')[1]));

        return payload.exp * 1000;
    } catch {
        return 0;
    }
}

export function isTokenValid(
    token: string | null,
    expiresAt: number,
    refreshBufferMs = 60_000
): boolean {
    if (!token) {
        return false;
    }

    return Date.now() < expiresAt - refreshBufferMs;
}

export async function parseResponse(response: Response): Promise<unknown> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    try {
        return isJson ? await response.json() : await response.text();
    } catch {
        return null;
    }
}
