import { HttpService } from "modules/Network";

export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

class TodoService {
  getAll() {
    return HttpService.get<Todo[]>("/todos");
  }

  getById(id: number) {
    return HttpService.get<Todo>(`/todos/${id}`);
  }

  create(title: string) {
    return HttpService.post<Todo>("/todos", {
      title,
      completed: false,
      userId: 1,
    });
  }
}

const todoService = new TodoService();

export { todoService as TodoService };
