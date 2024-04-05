"use client";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import TodoModal from "../components/TodoModal";
import Button from "../components/Button";
import todoService from "../services/todoService";
import useStore from "../../store";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});

  const { token, updateToken, todos, updateTodos } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/");
    const fetchTodos = async () => {
      const data = await todoService.get(token);
      updateTodos(data);
    };
    fetchTodos();
  }, []);

  const handleCloseModal = () => {
    setEditedTodo({});
    setShowModal(false);
  };

  const handleAddTodo = async (newTodo: FieldValues) => {
    try {
      const data = await todoService.post(newTodo, token);
      updateTodos(data);
      handleCloseModal();
    } catch (ex) {
      // Show UI to user that new todo is not created and
      // log the error to remote  logging service
      console.log(ex);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const data = await todoService.delete(todoId, token);
      updateTodos(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleEditTodo = async (todo: FieldValues) => {
    try {
      const data = await todoService.edit(todo, token);
      updateTodos(data);
      handleCloseModal();
    } catch (ex) {
      console.log(ex);
    }
  };

  const onCheckBoxClick = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todo: FieldValues
  ) => {
    todo.done = e.target.checked;
    const data = await todoService.edit(todo, token);
    updateTodos(data);
    // refetchTodos();
  };

  const isEditAction = () => {
    return Object.keys(editedTodo).length;
  };

  const handleSignout = () => {
    updateToken("");
    router.push("/");
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          buttonText="Add Todo"
        />
        <div className="signout-text" onClick={handleSignout}>
          Signout
        </div>
      </div>
      {showModal && (
        <TodoModal
          heading={isEditAction() ? "Edit Todo" : "Add Todo"}
          showModal={showModal}
          onConfirm={isEditAction() ? handleEditTodo : handleAddTodo}
          onClose={handleCloseModal}
          defaultValues={editedTodo}
        />
      )}
      {!todos.length ? (
        <div className="heading heading-not-found">No Todos Found !</div>
      ) : (
        <div className="table-content">
          <Table striped bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Details</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todos &&
                todos.length &&
                todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.done ? <s>{todo.name}</s> : <>{todo.name}</>}</td>
                    <td>
                      {todo.done ? <s>{todo.details}</s> : <>{todo.details}</>}
                    </td>
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={todo.done ? "checked" : "unchecked"}
                        id="flexCheckDefault"
                        checked={todo.done}
                        onChange={(e) => onCheckBoxClick(e, todo)}
                      />
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        buttonText="Edit"
                        onClick={() => {
                          setShowModal(true);
                          setEditedTodo(todo);
                        }}
                      />
                      <Button
                        variant="danger"
                        buttonText="Delete"
                        onClick={() => handleDeleteTodo(todo.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default TodoList;
