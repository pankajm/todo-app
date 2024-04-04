"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import Button from "./Button";

interface Props {
  showModal: boolean;
  defaultValues?: FieldValues;
  onConfirm: (todo: FieldValues) => void;
  onClose: () => void;
}

const TodoModal = ({ onConfirm, onClose, showModal, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <Modal show={showModal} onHide={onClose}>
      <form onSubmit={handleSubmit(onConfirm)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="input"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <div className="text-danger">The name field is required</div>
          )}
          <input
            className="input"
            placeholder="Details"
            {...register("details", { required: true })}
          />
          {errors.details && (
            <div className="text-danger">The details field is required</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" buttonText="Ok" />
          <Button variant="secondary" onClick={onClose} buttonText="Close" />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default TodoModal;
