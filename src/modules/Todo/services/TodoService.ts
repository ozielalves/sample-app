// create a Todo Service to get the todos from the API

import { HttpService } from "modules/Network/services/HttpService";
import { Todo } from "modules/Todo/types";

class TodoService {
    async getTodos(): Promise<Todo[]> {
        const response = await HttpService.get<Todo[]>("/todos");
        return response ?? [];
    }

    async createTodo(todo: Todo): Promise<Todo> {
        const response = await HttpService.post<Todo>("/todos", todo);
        return response ?? null;
    }

    async updateTodo(id: number, todo: Todo): Promise<Todo> {
        const response = await HttpService.put<Todo>(`/todos${id}`, todo);
        return response;
    }

    async deleteTodo(id: number): Promise<void> {
        await HttpService.delete<void>(`/todos/${id}`);
    }
}

const todoService = new TodoService();

export { todoService as TodoService };
