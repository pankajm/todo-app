import { FieldValues } from "react-hook-form";

const url = "/api/todo";

const postTodo = async (newTodo: FieldValues, token: string) => {
  const config = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newTodo),
  };
  const response = await fetch(url, config);
  const { data } = await response.json();
  return data;
};

const deleteTodo = async (todoId: string, token: string) => {
  const config = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(`${url}/${todoId}`, config);
  const { data } = await response.json();
  return data;
};

const editTodo = async (todo: FieldValues, token: string) => {
  const config = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(todo),
  };
  const response = await fetch(`${url}/${todo.id}`, config);
  const { data } = await response.json();
  return data;
};

export default {
  post: postTodo,
  delete: deleteTodo,
  edit: editTodo,
};
