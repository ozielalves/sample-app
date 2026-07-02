import { useCallback, useEffect, useState } from "react";

import { ApiError } from "modules/Network";
import { TodoService, type Todo } from "modules/Todos/services/TodoService";

type UseTodosState = {
  data: Todo[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useTodos(): UseTodosState {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const todos = await TodoService.getAll();
      setData(todos);
    } catch (err) {
      const message =
        err instanceof ApiError ? `Erro ${err.status}` : "Erro de rede";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
}
