import React, { DOMAttributes } from "react";
import classnames from "classnames";
import css from "./Button.module.css";

interface ButtonProps {
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  variant?: "primary";
  children: string;
  type?: "button" | "submit" | "reset";
}

function Button({ onClick, variant = "primary", children, type }: ButtonProps) {
  return (
    <button
      type={type}
      className={classnames({
        [css["button--primary"]]: variant === "primary",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
