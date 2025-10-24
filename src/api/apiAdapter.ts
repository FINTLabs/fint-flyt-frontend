interface AdapterResponse<T> {
    data: T;
    status: number;
    /*    statusText: string;
    headers: any;
    config: any;
    request?: any; // Or a more specific type if known*/
}

class ApiAdapter {
    private baseURL = '';

    setBaseURL(url: string) {
        this.baseURL = url;
    }

    private buildURL(url: string): string {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        if (url.startsWith('/')) {
            if (this.baseURL === '/') {
                return url;
            } else {
                return this.baseURL + url;
            }
        }

        return this.baseURL + '/' + url;
    }

    private async handleResponse<T>(response: Response): Promise<{ data: T; status: number }> {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');
        
        let data: T;
        if (isJson) {
            data = await response.json();
        } else {
            data = await response.text() as T;
        }
        
        return { data, status: response.status };
    }

    async get<T = any>(
        url: string,
        config?: {
            params?: Record<string, string | string[] | number | boolean | null | undefined>;
            headers?: Record<string, string>;
        }
    ): Promise<AdapterResponse<T>> {
        try {
            const fullURL = this.buildURL(url);
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

            const response = await fetch(finalURL, {
                method: 'GET',
                headers,
            });

            return this.handleResponse<T>(response);
        } catch (error) {
            console.log('error in apiAdapter get: ', error);
            throw error;
        }
    }

    async post<T = any>(
        url: string,
        data?: any,
        config?: { headers?: Record<string, string> }
    ): Promise<AdapterResponse<T>> {
        const fullURL = this.buildURL(url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        const response = await fetch(fullURL, {
            method: 'POST',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return this.handleResponse<T>(response);
    }

    async patch<T = any>(
        url: string,
        data?: any,
        config?: { headers?: Record<string, string> }
    ): Promise<AdapterResponse<T>> {
        const fullURL = this.buildURL(url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        const response = await fetch(fullURL, {
            method: 'PATCH',
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return this.handleResponse<T>(response);
    }

    async delete<T = any>(
        url: string,
        config?: { headers?: Record<string, string> }
    ): Promise<AdapterResponse<T>> {
        const fullURL = this.buildURL(url);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const headers = config?.headers ? { ...defaultHeaders, ...config.headers } : defaultHeaders;

        const response = await fetch(fullURL, {
            method: 'DELETE',
            headers,
        });

        return this.handleResponse<T>(response);
    }
}

// Create a singleton instance
const apiAdapter = new ApiAdapter();

export default apiAdapter;
