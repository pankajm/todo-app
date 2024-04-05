"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useStore from "../store";

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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + btoa(formData.username + ":" + formData.password),
        },
      });
      const { data, error_message } = await response.json();
      if (error_message) {
        return setError(error_message);
      }
      updateToken(data);
      router.push("/todolist");
    } catch (ex) {
      // log error on remote logging service ex - sentry
      console.log("in exception", ex);
      console.log(ex);
    }
  };

  return (
    <main>
      <form className="border-box" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="page-heading">Login Form</h1>
        <input
          className="input input-large"
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <div className="text-danger">The name field is required</div>
        )}

        <input
          className="input input-large"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <div className="text-danger">The password field is required</div>
        )}
        <div className="text-danger">{error}</div>
        <button type="submit" className="btn btn-primary btn-lg mt-5">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Login;
