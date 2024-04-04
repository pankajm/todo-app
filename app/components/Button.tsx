"use client";
import React from "react";
import Btn from "react-bootstrap/Button";

interface Props {
  onClick?: () => void;
  buttonText?: string;
  variant?: string;
  type?: "button" | "reset" | "submit";
}

const Button = ({ onClick, buttonText, variant, type }: Props) => {
  return (
    <span className="mx-1">
      <Btn onClick={onClick} variant={variant} type={type}>
        {buttonText}
      </Btn>
    </span>
  );
};

export default Button;
