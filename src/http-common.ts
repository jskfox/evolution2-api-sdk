/**
 * Minimal HTTP client using native fetch API.
 * Replaces axios — no external dependencies.
 *
 * Cliente HTTP mínimo usando la API fetch nativa de Node.js.
 * Reemplaza axios — sin dependencias externas.
 */

export interface HttpClient {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
  post<T>(url: string, body?: any, params?: Record<string, any>): Promise<T>;
  put<T>(url: string, body?: any, params?: Record<string, any>): Promise<T>;
  delete<T>(url: string, params?: Record<string, any>, body?: any): Promise<T>;
}

export interface HttpConfig {
  baseURL: string;
  headers: Record<string, string>;
}

/**
 * Builds a full URL with query parameters.
 * Concatenates baseURL + path (same behavior as axios).
 */
const buildUrl = (baseURL: string, path: string, params?: Record<string, any>): string => {
  let url = `${baseURL}${path}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  return url;
};

const createHttp = (config: HttpConfig): HttpClient => {
  const { baseURL, headers } = config;

  const request = async <T>(method: string, url: string, body?: any, params?: Record<string, any>): Promise<T> => {
    const fullUrl = buildUrl(baseURL, url, params);

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        status: response.status,
        statusText: response.statusText,
      }));
      throw error;
    }

    // 204 No Content — return undefined (void methods)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return undefined as T;
    }

    return response.json();
  };

  return {
    get: <T>(url: string, params?: Record<string, any>) => request<T>('GET', url, undefined, params),
    post: <T>(url: string, body?: any, params?: Record<string, any>) => request<T>('POST', url, body, params),
    put: <T>(url: string, body?: any, params?: Record<string, any>) => request<T>('PUT', url, body, params),
    delete: <T>(url: string, params?: Record<string, any>, body?: any) => request<T>('DELETE', url, body, params),
  };
};

export { createHttp };
export default createHttp;
