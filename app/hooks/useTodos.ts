import { useEffect, useState } from "react";
import useStore from "../../store";

interface Todo {
  id: string;
  name: string;
  details: string;
  done: boolean;
}

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const token = useStore((s) => s.token);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todo", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const { data } = await response.json();
      if (data) setTodos(data);
    } catch (ex) {
      console.log("exception is", ex);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const refetchTodos = () => fetchTodos();

  return { todos, refetchTodos };
};

export default useTodos;
