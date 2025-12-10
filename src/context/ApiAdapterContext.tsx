import { ContextProps } from './constants/interface';
import { createContext, useMemo, useState } from 'react';
const BASE_URL = import.meta.env.BASE_PATH || import.meta.env.BASE_URL || '/';

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
    const baseURL: string = useMemo(() => BASE_URL, []);

    function buildURL(apiUrl: string, url: string): string {
        if (!baseURL || baseURL === '/') {
            return url;
        }

        return `${apiUrl}${baseURL}${url}`;
    }

    async function handleResponse<T>(response: Response): Promise<{ data: T; status: number }> {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');
        let data: T;
        if (isJson) {
            data = (await response.json()) as T;
        } else {
            data = (await response.text()) as T;
        }
        return { data, status: response.status };
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

            const headers = new Headers({
                'Content-Type': 'application/json',
            });

            if (config?.headers) {
                config.headers.forEach((value, key) => {
                    headers.append(key, value);
                });
            }

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

            return handleResponse<T>(response);
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

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        const response = await fetch(fullURL, {
            method: 'POST',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return handleResponse<T>(response);
    }

    async function patch<T>(
        apiUrl: string,
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(apiUrl, url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        const response = await fetch(fullURL, {
            method: 'PATCH',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return handleResponse<T>(response);
    }

    async function deleteFetch<T>(
        apiUrl: string,
        url: string,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(apiUrl, url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        const response = await fetch(fullURL, {
            method: 'DELETE',
            headers,
        });

        return handleResponse<T>(response);
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
