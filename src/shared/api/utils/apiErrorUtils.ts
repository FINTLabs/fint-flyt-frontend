export interface ProblemDetail {
    name: string;
    error: string;
    status: number;
    message: string;
    path: string;
    timestamp?: string;
}

export function createApiError(
    response: Response,
    responseData: unknown,
    url: string
): ProblemDetail {
    const hasValidErrorMessage =
        typeof responseData === 'object' &&
        responseData !== null &&
        'message' in responseData &&
        typeof (responseData as any).message === 'string' &&
        (responseData as any).message.length > 0;

    if (hasValidErrorMessage) {
        const problem = responseData as Partial<ProblemDetail>;

        return {
            name: 'ProblemDetail',
            error: problem.error ?? 'Error',
            status: problem.status ?? response.status,
            message: problem.message!,
            timestamp: problem.timestamp,
            path: problem.path ?? url,
        };
    }

    return {
        name: 'ApiError',
        error: response.statusText,
        status: response.status,
        message: `Request failed (${response.status} ${response.statusText})`,
        path: url,
    };
}
