import { HttpService } from "modules/Network/services/HttpService";
import { TodoService } from "modules/Todo/services/TodoService";

jest.mock("modules/Network/services/HttpService", () => ({
    HttpService: {
        get: jest.fn().mockResolvedValue([{ id: 1, title: "Todo 1", completed: false }]),
        post: jest.fn().mockResolvedValue({ id: 1, title: "Todo 1", completed: false }),
        put: jest.fn().mockResolvedValue({ id: 1, title: "Todo 1", completed: false }),
        delete: jest.fn().mockResolvedValue(undefined),
    },
}));

describe("TodoService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should get todos", async () => {
        const todos = await TodoService.getTodos();
        expect(todos).toEqual([{ id: 1, title: "Todo 1", completed: false }]);
    });

    it("should create a todo", async () => {
        const todo = await TodoService.createTodo({ id: 1, title: "Todo 1", completed: false });
        expect(todo).toEqual({ id: 1, title: "Todo 1", completed: false });
    });

    it("should update a todo", async () => {
        const todo = await TodoService.updateTodo(1, { id: 1, title: "Todo 1", completed: false });
        expect(todo).toEqual({ id: 1, title: "Todo 1", completed: false });
    });

    it("should delete a todo", async () => {
        await TodoService.deleteTodo(1);
        expect(HttpService.delete).toHaveBeenCalledWith("/todos/1");
    });
});
