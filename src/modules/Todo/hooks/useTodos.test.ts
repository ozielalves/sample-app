// need to test the useTodos hook, mocking the TodosService and validating the loading, error states

import { renderHook, waitFor } from "@testing-library/react-native";
import { useTodos } from "modules/Todo/hooks/useTodos";
import { TodoService } from "modules/Todo/services/TodoService";

jest.mock("modules/Todo/services/TodoService", () => ({
    TodoService: {
        getTodos: jest
            .fn()
            .mockImplementation(
                () =>
                    new Promise((resolve) =>
                        setTimeout(() => resolve([{ id: 1, title: "Todo 1", completed: false }]), 1000),
                    ),
            ),
    },
}));

describe("useTodos", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should stay in loading state until the todos are fetched", async () => {
        const { result } = renderHook(() => useTodos());

        expect(result.current.todos).toEqual([]);
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe(null);
    });

    it("should return the todos", async () => {
        const { result } = renderHook(() => useTodos());

        await waitFor(
            () => {
                expect(result.current.isLoading).toBe(false);
            },
            { timeout: 1500 },
        );

        expect(result.current.todos).toEqual([{ id: 1, title: "Todo 1", completed: false }]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it("should return an error if the todos are not fetched", async () => {
        jest.spyOn(TodoService, "getTodos").mockRejectedValue(new Error("Error fetching todos"));

        const { result } = renderHook(() => useTodos());

        await waitFor(() => {
            expect(result.current.error?.message).toBe("Error fetching todos");
        });
    });

    it("should refresh the todos", async () => {
        const { result } = renderHook(() => useTodos());

        await result.current.refresh();

        expect(TodoService.getTodos).toHaveBeenCalled();
    });
});
