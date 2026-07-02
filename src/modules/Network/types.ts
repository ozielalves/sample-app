export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HttpRequestOptions = {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: unknown;
    signal?: AbortSignal;
};

export class ApiError extends Error {
    constructor(
        public readonly status: number,
        message: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}
