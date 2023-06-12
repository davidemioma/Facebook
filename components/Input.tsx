import React from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface Props {
  id: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input = ({
  id,
  placeholder,
  type = "text",
  disabled,
  required,
  register,
  errors,
}: Props) => {
  return (
    <input
      className={`border px-4 py-2.5 ${
        errors[id]
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-black"
      } w-full rounded bg-transparent transition focus:outline-none disabled:cursor-not-allowed`}
      id={id}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      {...register(id, { required })}
    />
  );
};

export default Input;
