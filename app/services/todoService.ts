import { FieldValues } from "react-hook-form";
import { URL } from "../constants";
import HttpService from "./httpService";

const getTodos = async (token: string) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return HttpService(config);
};

const postTodo = async (newTodo: FieldValues, token: string) => {
  const config = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newTodo),
  };
  return HttpService(config);
};

const deleteTodo = async (todoId: string, token: string) => {
  const config = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const url = `${URL}/${todoId}`;
  return HttpService(config, url);
};

const editTodo = async (todo: FieldValues, token: string) => {
  const config = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(todo),
  };

  const url = `${URL}/${todo.id}`;
  return HttpService(config, url);
};

export default {
  post: postTodo,
  delete: deleteTodo,
  edit: editTodo,
  get: getTodos,
};
