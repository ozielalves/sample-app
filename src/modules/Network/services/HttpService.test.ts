import { HttpService } from "modules/Network/services/HttpService";
import NetworkConst from "modules/Network/const";
import { ApiError } from "modules/Network/types";

const mockFetch = jest.fn();

function createFetchResponse({
    ok = true,
    status = 200,
    statusText = ok ? "OK" : "Error",
    json,
    text = "",
}: {
    ok?: boolean;
    status?: number;
    statusText?: string;
    json?: unknown;
    text?: string;
}) {
    const jsonMock = jest.fn().mockResolvedValue(json);
    const textMock = jest.fn().mockResolvedValue(text);

    return {
        ok,
        status,
        statusText,
        json: jsonMock,
        text: textMock,
    } as unknown as Response;
}

describe("HttpService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        globalThis.fetch = mockFetch as typeof fetch;
    });

    it("sends GET with the correct URL and default headers", async () => {
        mockFetch.mockResolvedValue(createFetchResponse({ json: { id: 1 } }));

        const result = await HttpService.get<{ id: number }>("/todos");

        expect(mockFetch).toHaveBeenCalledWith(
            `${NetworkConst.API_BASE_URL}/todos`,
            expect.objectContaining({
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: undefined,
            }),
        );
        expect(result).toEqual({ id: 1 });
    });

    it("serializes POST body as JSON", async () => {
        mockFetch.mockResolvedValue(createFetchResponse({ json: { id: 1 } }));

        await HttpService.post("/todos", { title: "Test" });

        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify({ title: "Test" }),
            }),
        );
    });

    it.each([
        ["put", (path: string) => HttpService.put(path, { title: "Updated" }), "PUT"],
        ["patch", (path: string) => HttpService.patch(path, { completed: true }), "PATCH"],
        ["delete", (path: string) => HttpService.delete(path), "DELETE"],
    ] as const)("sends %s with the correct HTTP method", async (_name, call, method) => {
        mockFetch.mockResolvedValue(createFetchResponse({ status: 204 }));

        await call("/todos/1");

        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method }));
    });

    it("merges custom headers with defaults", async () => {
        mockFetch.mockResolvedValue(createFetchResponse({ json: {} }));

        await HttpService.get("/todos", {
            headers: { Authorization: "Bearer token" },
        });

        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer token",
                },
            }),
        );
    });

    it("throws ApiError when the response is not ok", async () => {
        mockFetch.mockResolvedValue(
            createFetchResponse({
                ok: false,
                status: 404,
                statusText: "Not Found",
                text: "Todo not found",
            }),
        );

        await expect(HttpService.get("/todos/999")).rejects.toMatchObject({
            name: "ApiError",
            status: 404,
            message: "Todo not found",
        });

        await expect(HttpService.get("/todos/999")).rejects.toBeInstanceOf(ApiError);
    });

    it("returns undefined for 204 responses without parsing JSON", async () => {
        const response = createFetchResponse({ status: 204 });
        mockFetch.mockResolvedValue(response);

        const result = await HttpService.delete("/todos/1");

        expect(result).toBeUndefined();
        expect(response.json).not.toHaveBeenCalled();
    });
});
