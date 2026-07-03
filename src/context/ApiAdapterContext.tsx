import { ContextProps } from './constants/interface';
import { createContext, useMemo, useRef } from 'react';
import {
    buildSearchParams,
    createAbortSignal,
    getTokenExpiration,
    isTokenValid,
    parseResponse,
} from './utils/fetchUtils';
import { createApiError } from './utils/apiErrorUtils';

const BASE_PATH = process.env.BASE_PATH ?? '';
const USE_AUTH = !!process.env.BASE_PATH;

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

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
    const baseURL: string = useMemo(() => BASE_PATH, []);

    const tokenRef = useRef<string | null>(null);
    const tokenExpiresAtRef = useRef<number>(0);
    const tokenPromiseRef = useRef<Promise<string> | null>(null);

    async function getAuthorizationHeader(): Promise<string> {
        if (isTokenValid(tokenRef.current, tokenExpiresAtRef.current)) {
            return tokenRef.current!;
        }

        if (tokenPromiseRef.current) {
            return tokenPromiseRef.current;
        }

        tokenPromiseRef.current = fetch(`${baseURL}/auth/header`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch authorization header');
                }

                const authorization = response.headers.get('Authorization');

                if (!authorization) {
                    throw new Error('Authorization header missing');
                }

                tokenRef.current = authorization;
                tokenExpiresAtRef.current = getTokenExpiration(authorization);

                return authorization;
            })
            .finally(() => {
                tokenPromiseRef.current = null;
            });

        return tokenPromiseRef.current;
    }

    function clearAuthorizationHeader(): void {
        tokenRef.current = null;
        tokenExpiresAtRef.current = 0;
        tokenPromiseRef.current = null;
    }

    function buildURL(apiUrl: string, url: string): string {
        return !baseURL || baseURL === '/' ? url : `${baseURL}${url}`;
    }

    async function buildHeaders(config?: AdapterRequestConfigType): Promise<Headers> {
        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        if (USE_AUTH) {
            const authorization = await getAuthorizationHeader();
            headers.set('Authorization', authorization);
        }

        config?.headers?.forEach((value, key) => {
            headers.set(key, value);
        });

        return headers;
    }

    async function handleResponse<T>(response: Response, url: string): Promise<AdapterResponse<T>> {
        const responseData = await parseResponse(response);

        if (!response.ok) {
            throw createApiError(response, responseData, url);
        }

        return {
            data: responseData as T,
            status: response.status,
        };
    }

    async function fetchWithAuthRetry(
        url: RequestInfo | URL,
        requestInit: RequestInit,
        config?: AdapterRequestConfigType
    ): Promise<Response> {
        let response = await fetch(url, requestInit);

        if (!USE_AUTH || response.status !== 401) {
            return response;
        }

        clearAuthorizationHeader();
        const headers = await buildHeaders(config);

        return fetch(url, {
            ...requestInit,
            headers,
        });
    }

    async function request<T>(
        method: HttpMethod,
        apiUrl: string,
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const requestUrl = buildURL(apiUrl, url);
        const headers = await buildHeaders(config);

        const response = await fetchWithAuthRetry(
            requestUrl,
            {
                method,
                headers,
                body: data ? JSON.stringify(data) : undefined,
                signal: createAbortSignal(config?.timeout),
            },
            config
        );

        return handleResponse<T>(response, url);
    }

    async function get<T>(
        apiUrl: string,
        url: string,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        try {
            const requestUrl = buildURL(apiUrl, url);
            const params = buildSearchParams(config?.params);

            const requestUrlWithParams = params.toString()
                ? `${requestUrl}?${params.toString()}`
                : requestUrl;

            const headers = await buildHeaders(config);

            const response = await fetchWithAuthRetry(
                requestUrlWithParams,
                {
                    method: 'GET',
                    headers,
                    signal: createAbortSignal(config?.timeout),
                },
                config
            );

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
        return request<T>('POST', apiUrl, url, data, config);
    }

    async function patch<T>(
        apiUrl: string,
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        return request<T>('PATCH', apiUrl, url, data, config);
    }

    async function deleteFetch<T>(
        apiUrl: string,
        url: string,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        return request<T>('DELETE', apiUrl, url, undefined, config);
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
