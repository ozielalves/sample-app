import { useCallback, useEffect, useState } from "react";
import { TodoService } from "modules/Todo/services/TodoService";
import { Todo } from "modules/Todo/types";

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchTodos = useCallback(async () => {
        try {
            const todos = await TodoService.getTodos();
            setTodos(todos);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return { todos, refresh: fetchTodos, isLoading, error };
};
