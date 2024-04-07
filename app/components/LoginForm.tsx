import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { PASSWORD_ERROR, USERNAME_ERROR } from "../constants";

interface Props {
  formErrors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  loginApiError: string;
}

const LoginForm = ({ formErrors, register, loginApiError }: Props) => {
  return (
    <>
      <h1 className="page-heading">Login Form</h1>
      <input
        className="input input-large"
        type="text"
        placeholder="Username"
        {...register("username", { required: true })}
      />
      {formErrors.username && (
        <div className="text-danger">{USERNAME_ERROR}</div>
      )}

      <input
        className="input input-large"
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      {formErrors.password && (
        <div className="text-danger">{PASSWORD_ERROR}</div>
      )}
      <div className="text-danger">{loginApiError}</div>
      <button type="submit" className="btn btn-primary btn-lg mt-5">
        Submit
      </button>
    </>
  );
};

export default LoginForm;
