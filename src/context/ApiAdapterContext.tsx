import { ContextProps } from './constants/interface';
import { createContext, useState } from 'react';

export type AdapterRequestConfigType = {
    params?: Record<string, string | string[] | number | boolean | null | undefined>;
    headers?: Headers;
    timeout?: number;
};

export interface AdapterResponse<T> {
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
    getBaseURL: () => Promise<string>;
    get: <T>(url: string, config?: AdapterRequestConfigType) => Promise<AdapterResponse<T>>;
    post: <T>(
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ) => Promise<AdapterResponse<T>>;
    patch: <T>(
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ) => Promise<AdapterResponse<T>>;
    deleteFetch: <T>(url: string, config?: AdapterRequestConfigType) => Promise<AdapterResponse<T>>;
};

// TODO: do something about the wonky types
const apiAdapterDefaultValues: apiAdapterState = {
    setBaseURL: () => undefined,
    baseURL: '',
    getBaseURL: async () => '/',
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
    const [baseURL, setBaseURL] = useState<string>('');


  /*  useEffect(() => {
        console.log('APIAdapterProvider mounted', BASE_PATH);
    }, []);

    console.log('APIAdapterProvider baseURL', baseURL);

    useEffect(() => {
        console.log('useEffect - Getting base url from configuration');
        get<{ basePath: string }>('api/application/configuration')
            .then((value) => {
                console.log('useEffect - Got base url from configuration:', value.data.basePath);
                setBaseURL(value.data.basePath);
            })
            .catch((reason) => {
                console.error('useEffect - Error getting config:', reason);
                setBaseURL('/');
            });
    }, []);*/

    async function getBaseURL(): Promise<string> {
        console.log('Getting base url from configuration');
        return await get<{ basePath: string }>('api/application/configuration')
            .then((value) => {
                console.log('Got base url from configuration:', value.data.basePath);
                setBaseURL(value.data.basePath);
                return value.data.basePath;
            })
            .catch((reason) => {
                console.error('Error getting config:', reason);
                setBaseURL('/');
                return '/';
            });
    }

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
            data = (await response.json()) as T;
        } else {
            data = (await response.text()) as T;
        }
        return { data, status: response.status };
    }

    async function get<T>(
        url: string,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        try {
            const fullURL = buildURL(url);
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

            console.log('apiAdapter get - finalURL: ', finalURL);
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
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        console.log('apiAdapter post - fullURL: ', fullURL, ' data: ', data);
        const response = await fetch(fullURL, {
            method: 'POST',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return handleResponse<T>(response);
    }

    async function patch<T>(
        url: string,
        data?: unknown,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        console.log('apiAdapter patch - fullURL: ', fullURL, ' data: ', data);
        const response = await fetch(fullURL, {
            method: 'PATCH',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return handleResponse<T>(response);
    }

    async function deleteFetch<T>(
        url: string,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<T>> {
        const fullURL = buildURL(url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        console.log('apiAdapter delete - fullURL: ', fullURL);
        const response = await fetch(fullURL, {
            method: 'DELETE',
            headers,
        });

        return handleResponse<T>(response);
    }

    return (
        <ApiAdapterContext.Provider
            value={{
                setBaseURL,
                getBaseURL,
                baseURL,
                get,
                post,
                patch,
                deleteFetch,
            }}>
            {children}
        </ApiAdapterContext.Provider>
    );
};

export { ApiAdapterContext, APIAdapterProvider };
