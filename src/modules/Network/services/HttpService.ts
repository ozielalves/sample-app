import NetworkConst from "modules/Network/const";
import { ApiError, type HttpRequestOptions } from "modules/Network/types";

class HttpService {
  constructor(private readonly baseUrl: string = NetworkConst.API_BASE_URL) {}

  get<T>(path: string, options?: Omit<HttpRequestOptions, "method" | "body">) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(
    path: string,
    body: unknown,
    options?: Omit<HttpRequestOptions, "method" | "body">,
  ) {
    return this.request<T>(path, { ...options, method: "POST", body });
  }

  async request<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
    const { method = "GET", headers = {}, body, signal } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      NetworkConst.DEFAULT_TIMEOUT_MS,
    );

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: signal ?? controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new ApiError(response.status, errorBody || response.statusText);
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

const httpService = new HttpService();

export { httpService as HttpService };
