"use client";
import React, { useEffect, useState } from "react";
import TodoTable from "../components/TodoTable";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import TodoModal from "../components/TodoModal";
import Button from "../components/Button";
import todoService from "../services/todoService";
import useStore from "../../store";
import Notify from "../components/Toast";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});
  const [showToast, setShowToast] = useState(false);
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

  /**
   *
   * @param newTodo FieldValues
   */
  const handleAddTodo = async (newTodo: FieldValues) => {
    try {
      const data = await todoService.post(newTodo, token);
      if (data) updateTodos(data);
      else setShowToast(true);
      handleCloseModal();
    } catch (ex) {
      // Show UI to user that new todo is not created and
      // log the error to remote  logging service
      setShowToast(true);
      console.log(ex); // ex - sentry
    }
  };

  /**
   *
   * @param todo FieldValue
   */
  const handleEditTodo = async (todo: FieldValues) => {
    try {
      const data = await todoService.edit(todo, token);
      if (data) updateTodos(data);
      else setShowToast(true);
      handleCloseModal();
    } catch (ex) {
      console.log(ex); // Ideally error should be logged to remote error logging service ex - sentry
    }
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
      {todos && !todos.length ? (
        <div className="heading heading-not-found">No Todos Found !</div>
      ) : (
        <TodoTable
          setEditedTodo={setEditedTodo}
          setShowModal={setShowModal}
          setShowToast={setShowToast}
        />
      )}
      {
        <Notify
          show={showToast}
          onClose={() => setShowToast(false)}
          variant="danger"
        />
      }
    </>
  );
};

export default TodoList;
