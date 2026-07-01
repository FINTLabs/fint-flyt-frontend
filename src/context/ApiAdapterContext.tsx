import { ContextProps } from './constants/interface';
import { createContext, useMemo, useRef } from 'react';

const BASE_PATH = process.env.BASE_PATH ?? '';

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
    const baseURL: string = useMemo(() => BASE_PATH, []);

    const tokenRef = useRef<string | null>(null);
    const tokenExpiresAtRef = useRef<number>(0);
    const tokenPromiseRef = useRef<Promise<string> | null>(null);

    function getTokenExpiration(token: string): number {
        const jwt = token.replace('Bearer ', '');
        const payload = JSON.parse(atob(jwt.split('.')[1]));

        return payload.exp * 1000;
    }

    function isTokenValid(): boolean {
        if (!tokenRef.current) {
            return false;
        }

        // forny token ett minutt før utløp
        const refreshBufferMs = 60_000;

        return Date.now() < tokenExpiresAtRef.current - refreshBufferMs;
    }

    async function getAuthorizationHeader(): Promise<string> {
        if (isTokenValid()) {
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

    function createAbortSignal(timeout?: number): AbortSignal | undefined {
        if (!timeout) {
            return undefined;
        }

        const controller = new AbortController();
        setTimeout(() => controller.abort(), timeout);
        return controller.signal;
    }

    function buildURL(apiUrl: string, url: string): string {
        return !baseURL || baseURL === '/' ? url : `${baseURL}${url}`;
    }

    async function buildHeaders(config?: AdapterRequestConfigType): Promise<Headers> {
        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        if (baseURL) {
            console.log("setting headers")
            const authorization = await getAuthorizationHeader();
            headers.set('Authorization', authorization);
        }

        config?.headers?.forEach((value, key) => {
            headers.set(key, value);
        });

        return headers;
    }

    function buildSearchParams(params?: AdapterRequestConfigType['params']): URLSearchParams {
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

    async function fetchWithAuthRetry(
        url: RequestInfo | URL,
        requestInit: RequestInit,
        config?: AdapterRequestConfigType
    ): Promise<Response> {
        let response = await fetch(url, requestInit);

        if (response.status !== 401) {
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
        method: string,
        apiUrl: string,
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const requestUrl = buildURL(apiUrl, url);
        let headers = await buildHeaders(config);

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

            let headers = await buildHeaders(config);

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
