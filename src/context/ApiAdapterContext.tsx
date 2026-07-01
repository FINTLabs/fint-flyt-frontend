import { ContextProps } from './constants/interface';
import { createContext, useMemo, useRef, useState } from 'react';
const BASE_PATH = process.env.BASE_PATH || '';

export type AdapterRequestConfigType = {
    params?: Record<string, string | string[] | number | boolean | null | undefined>;
    headers?: Headers;
    timeout?: number;
};

export interface AdapterResponse<T> {
    data: T;
    status: number;
}

type apiAdapterState = {
    baseURL: string;
    get: <T>(
        apiUrl: string,
        url: string,
        config?: AdapterRequestConfigType
    ) => Promise<AdapterResponse<T>>;
    post: <T>(
        apiUrl: string,
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ) => Promise<AdapterResponse<T>>;
    patch: <T>(
        apiUrl: string,
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ) => Promise<AdapterResponse<T>>;
    deleteFetch: <T>(
        apiUrl: string,
        url: string,
        config?: AdapterRequestConfigType
    ) => Promise<AdapterResponse<T>>;
};

export interface ProblemDetail {
    name: string;
    error: string;
    status: number;
    message: string;
    path: string;
    timestamp?: string;
}

const apiAdapterDefaultValues: apiAdapterState = {
    baseURL: '',
    get: async <T,>() => {
        return { data: {} as T, status: 0 };
    },
    post: async <T,>() => {
        return { data: {} as T, status: 0 };
    },
    patch: async <T,>() => {
        return { data: {} as T, status: 0 };
    },
    deleteFetch: async <T,>() => {
        return { data: {} as T, status: 0 };
    },
};

const ApiAdapterContext = createContext<apiAdapterState>(apiAdapterDefaultValues);

const APIAdapterProvider = ({ children }: ContextProps) => {
    const tokenRef = useRef<string>();
    const baseURL: string = useMemo(() => BASE_PATH, []);

    async function getAccessToken(): Promise<string | undefined> {
        if (tokenRef.current) {
            return tokenRef.current;
        }

        const response = await fetch(`${baseURL}/auth/header`;

        if (!response.ok) {
            throw new Error('Kunne ikke hente token');
        }

        const data = await response.json();

        tokenRef.current = data.authorization;
        return tokenRef.current;
    }

    function buildURL(apiUrl: string, url: string): string {
        if (!baseURL || baseURL === '/') {
            return url;
        }

        // return `${apiUrl}${baseURL}${url}`;
        return `${baseURL}${url}`;
    }

    async function buildHeaders(config?: AdapterRequestConfigType): Promise<Headers> {
        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        try {
            const authorizationHeader = await getAccessToken();

            if (authorizationHeader) {
                headers.set('Authorization', authorizationHeader);
            }
        } catch (error) {
            console.error('Kunne ikke hente token', error);
        }

        config?.headers?.forEach((value, key) => {
            headers.set(key, value);
        });

        return headers;
    }

    async function handleResponse<T>(response: Response, url: string): Promise<AdapterResponse<T>> {
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');

        let responseData: unknown = null;

        try {
            responseData = isJson ? await response.json() : await response.text();
        } catch {
            responseData = null;
        }

        if (!response.ok) {
            let apiError: ProblemDetail;
            const hasValidErrorMessage =
                typeof responseData === 'object' &&
                responseData !== null &&
                'message' in responseData &&
                typeof (responseData as any).message === 'string' &&
                (responseData as any).message.length > 0;

            if (hasValidErrorMessage) {
                const problem = responseData as Partial<ProblemDetail>;

                apiError = {
                    name: 'ProblemDetail',
                    error: problem.error ?? 'Error',
                    status: problem.status ?? response.status,
                    message: problem.message!,
                    timestamp: problem.timestamp,
                    path: problem.path ?? url,
                };
            } else {
                apiError = {
                    name: 'ApiError',
                    error: response.statusText,
                    status: response.status,
                    message: `Request failed (${response.status} ${response.statusText})`,
                    path: url,
                };
            }

            throw apiError;
        }

        return {
            data: responseData as T,
            status: response.status,
        };
    }

    async function get<T>(
        apiUrl: string,
        url: string,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        try {
            const fullURL = buildURL(apiUrl, url);
            const searchParams = new URLSearchParams();

            if (config?.params) {
                Object.entries(config.params).forEach(([key, value]) => {
                    if (value != null) {
                        (Array.isArray(value) ? value : [value]).forEach((v) => {
                            searchParams.append(key, String(v));
                        });
                    }
                });
            }

            const finalURL = searchParams.toString()
                ? `${fullURL}?${searchParams.toString()}`
                : fullURL;

            const headers = await buildHeaders(config);

            const controller = new AbortController();
            const signal = controller.signal;

            if (config?.timeout) {
                setTimeout(() => controller.abort(), config.timeout);
            }

            const response = await fetch(finalURL, {
                method: 'GET',
                headers,
                signal,
            });

            return handleResponse<T>(response, url);
        } catch (error) {
            console.error('error in apiAdapter get: ', error, url);
            throw error;
        }
    }

    async function post<T>(
        apiUrl: string,
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(apiUrl, url);

        const headers = await buildHeaders(config);

        const response = await fetch(fullURL, {
            method: 'POST',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return handleResponse<T>(response, url);
    }

    async function patch<T>(
        apiUrl: string,
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(apiUrl, url);

        const headers = await buildHeaders(config);

        const response = await fetch(fullURL, {
            method: 'PATCH',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return handleResponse<T>(response, url);
    }

    async function deleteFetch<T>(
        apiUrl: string,
        url: string,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(apiUrl, url);

        const headers = await buildHeaders(config);

        const response = await fetch(fullURL, {
            method: 'DELETE',
            headers,
        });

        return handleResponse<T>(response, url);
    }

    return (
        <ApiAdapterContext.Provider
            value={{
                baseURL,
                get,
                post,
                patch,
                deleteFetch,
            }}
        >
            {children}
        </ApiAdapterContext.Provider>
    );
};

export { ApiAdapterContext, APIAdapterProvider };
