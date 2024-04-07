import React from "react";
import { Table } from "react-bootstrap";
import { FieldValues } from "react-hook-form";
import todoService from "../services/todoService";
import useStore from "../../store";
import Button from "../components/Button";

interface Props {
  setShowModal: (arg: boolean) => void;
  setEditedTodo: (todo: FieldValues) => void;
  setShowToast: (arg: boolean) => void;
}

const TodoTable = ({ setEditedTodo, setShowModal, setShowToast }: Props) => {
  const { token, todos, updateTodos } = useStore();

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const data = await todoService.delete(todoId, token);
      if (data) updateTodos(data);
      else setShowToast(true);
    } catch (ex) {
      setShowToast(true);
      console.log(ex); // Ideally error should be logged to remote error logging service ex - sentry
    }
  };

  const onCheckBoxClick = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todo: FieldValues
  ) => {
    todo.done = e.target.checked;
    const data = await todoService.edit(todo, token);
    if (data) updateTodos(data);
    else setShowToast(true);
  };

  return (
    <>
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
    </>
  );
};

export default TodoTable;
