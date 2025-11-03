import { ContextProps } from './constants/interface';
import { createContext, useEffect, useState } from 'react';

interface AdapterResponse<T> {
    data: T;
    status: number;
    /*    statusText: string;
    headers: any;
    config: any;
    request?: any; // Or a more specific type if known*/
}

type apiAdapterState = {
    setBaseURL: (url: string) => void;
    baseURL: string;
    get: <T = any>(
        url: string,
        config?: {
            params?: Record<string, string | string[] | number | boolean | null | undefined>;
            headers?: Record<string, string>;
        }
    ) => Promise<AdapterResponse<T>>;
    post: <T = any>(
        url: string,
        data?: any,
        config?: { headers?: Record<string, string> }
    ) => Promise<AdapterResponse<T>>;
    patch: <T = any>(
        url: string,
        data?: any,
        config?: { headers?: Record<string, string> }
    ) => Promise<AdapterResponse<T>>;
    delete: <T = any>(
        url: string,
        config?: { headers?: Record<string, string> }
    ) => Promise<AdapterResponse<T>>;
};

// TODO: do something about the wonky types
const apiAdapterDefaultValues: apiAdapterState = {
    setBaseURL: () => undefined,
    baseURL: '',
    get: async () => {
        return { data: undefined as any, status: 0 };
    },
    post: async () => {
        return { data: undefined as any, status: 0 };
    },
    patch: async () => {
        return { data: undefined as any, status: 0 };
    },
    delete: async () => {
        return { data: undefined as any, status: 0 };
    },
};

const ApiAdapterContext = createContext<apiAdapterState>(apiAdapterDefaultValues);

const APIAdapterProvider = ({ children }: ContextProps) => {
    const [baseURL, setBaseURL] = useState<string>('');

    function buildURL(url: string): string {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        if (url.startsWith('/')) {
            if (!baseURL || baseURL === '/') {
                return url;
            }
            return baseURL + url;
        }

        if (!baseURL || baseURL === '/') {
            return '/' + url;
        }
        return baseURL + '/' + url;
    }

    async function handleResponse<T>(response: Response): Promise<{ data: T; status: number }> {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');
        let data: T;
        if (isJson) {
            data = await response.json();
        } else {
            data = (await response.text()) as T;
        }
        return { data, status: response.status };
    }

    async function get<T = any>(
        url: string,
        config?: {
            params?: Record<string, string | string[] | number | boolean | null | undefined>;
            headers?: Record<string, string>;
        }
    ): Promise<AdapterResponse<T>> {
        try {
            const fullURL = buildURL(url);
            const searchParams = new URLSearchParams();

            if (config?.params) {
                Object.entries(config.params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        searchParams.append(key, String(value));
                    }
                });
            }

            const finalURL = searchParams.toString()
                ? `${fullURL}?${searchParams.toString()}`
                : fullURL;

            const defaultHeaders = {
                'Content-Type': 'application/json',
            };

            const headers = config?.headers
                ? { ...defaultHeaders, ...config.headers }
                : defaultHeaders;

            console.log('finalURL in apiAdapter get: ', finalURL);

            const response = await fetch(finalURL, {
                method: 'GET',
                headers,
            });

            return handleResponse<T>(response);
        } catch (error) {
            console.log('error in apiAdapter get: ', error);
            throw error;
        }
    }

    async function post<T = any>(
        url: string,
        data?: any,
        config?: { headers?: Record<string, string> }
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        console.log('finalURL in apiAdapter post: ', fullURL);
        const response = await fetch(fullURL, {
            method: 'POST',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return handleResponse<T>(response);
    }

    async function patch<T = any>(
        url: string,
        data?: any,
        config?: { headers?: Record<string, string> }
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        console.log('finalURL in apiAdapter patch: ', fullURL);
        const response = await fetch(fullURL, {
            method: 'PATCH',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return handleResponse<T>(response);
    }

    async function fetchDelete<T = any>(
        url: string,
        config?: { headers?: Record<string, string> }
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        console.log('finalURL in apiAdapter patch: ', fullURL);
        const response = await fetch(fullURL, {
            method: 'DELETE',
            headers,
        });

        return handleResponse<T>(response);
    }

    useEffect(() => {
        get<{ basePath: string }>('api/application/configuration')
            .then((value) => {
                setBaseURL(value.data.basePath);
            })
            .catch((reason) => {
                console.log('Error getting config:', reason);
                setBaseURL('/');
            });
    }, []);

    return (
        <ApiAdapterContext.Provider
            value={{
                setBaseURL,
                baseURL,
                get,
                post,
                patch,
                delete: fetchDelete
            }}>
            {baseURL ? children : <h1>Laster...</h1>}
        </ApiAdapterContext.Provider>
    );
};

export { ApiAdapterContext, APIAdapterProvider };


