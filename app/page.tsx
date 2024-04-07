"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import useStore from "../store";
import LoginForm from "./components/LoginForm";
import authService from "./services/authService";

const Login = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const updateToken = useStore((s) => s.updateToken);
  const token = useStore((s) => s.token);

  useEffect(() => {
    if (token) router.push("/todolist");
  }, []);

  const onSubmit = async (formData: FieldValues) => {
    if (error) setError("");
    try {
      const payload = {
        username: formData.username,
        password: formData.password,
      };
      const { data, error_message } = await authService.login(payload);
      if (error_message) {
        return setError(error_message);
      }
      updateToken(data);
      router.push("/todolist");
    } catch (ex) {
      // log error on remote logging service ex - sentry/bugsnag
      console.log("in exception", ex);
      console.log(ex);
    }
  };

  return (
    <main>
      <form className="border-box" onSubmit={handleSubmit(onSubmit)}>
        <LoginForm
          formErrors={errors}
          loginApiError={error}
          register={register}
        />
      </form>
    </main>
  );
};

export default Login;
