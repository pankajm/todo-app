"use client";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FieldValues } from "react-hook-form";
import TodoModal from "../components/TodoModal";
import Button from "../components/Button";
import useToddos from "../hooks/useTodos";
import todoService from "../services/todoService";
import useStore from "../../store";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});
  const { todos, refetchTodos } = useToddos();
  const token = useStore((s) => s.token);

  const handleCloseModal = () => {
    setEditedTodo({});
    setShowModal(false);
  };

  const handleAddTodo = async (newTodo: FieldValues) => {
    try {
      await todoService.post(newTodo, token);
      refetchTodos();
      handleCloseModal();
    } catch (ex) {
      // Show UI to user that new todo is not created and
      // log the error to remote  logging service
      console.log(ex);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await todoService.delete(todoId, token);
      refetchTodos();
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleEditTodo = async (todo: FieldValues) => {
    try {
      await todoService.edit(todo, token);
      refetchTodos();
      handleCloseModal();
    } catch (ex) {
      console.log(ex);
    }
  };

  const isEditAction = () => {
    return Object.keys(editedTodo).length;
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        buttonText="Add Todo"
      />
      {showModal && (
        <TodoModal
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
                    <td>{todo.name}</td>
                    <td>{todo.details}</td>
                    <td>{todo.done}</td>
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
    </div>
  );
};

export default TodoList;
