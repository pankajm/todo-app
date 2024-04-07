// @ts-nocheck

import React from "react";
import { render, screen } from "@testing-library/react";
import { PASSWORD_ERROR, USERNAME_ERROR } from "../../app/constants";
import LoginForm from "../../app/components/LoginForm";
import { FieldErrors, FieldValues } from "react-hook-form";

describe("LoginForm component", () => {
  const mockProps = {
    formErrors: {} as FieldErrors<FieldValues>,
    register: vi.fn(),
    loginApiError: "",
  };

  it("should renders login form with username and password inputs", () => {
    render(<LoginForm {...mockProps} />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("should displays username error message if username is invalid", () => {
    const formErrors = { username: true };
    render(<LoginForm {...mockProps} formErrors={formErrors} />);
    expect(screen.getByText(USERNAME_ERROR)).toBeInTheDocument();
  });

  it("should displays password error message if password is invalid", () => {
    const formErrors = { password: true };
    render(<LoginForm {...mockProps} formErrors={formErrors} />);
    expect(screen.getByText(PASSWORD_ERROR)).toBeInTheDocument();
  });

  it("should displays login API error message if login fails", () => {
    const loginApiError = "Invalid credentials";
    render(<LoginForm {...mockProps} loginApiError={loginApiError} />);
    expect(screen.getByText(loginApiError)).toBeInTheDocument();
  });

  it("should calls register function with correct arguments for username and password inputs", () => {
    const register = vi.fn();
    render(<LoginForm {...mockProps} register={register} />);
    expect(register).toHaveBeenCalledWith("username", { required: true });
    expect(register).toHaveBeenCalledWith("password", { required: true });
  });
});
