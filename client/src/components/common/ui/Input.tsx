"use client";

import { useId } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
}

export default function Input<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  disabled = false,
}: InputProps<T>) {
  const id = useId();

  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = name.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }

    return undefined;
  }, errors);

  const errorMessage =
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message
      : undefined;

  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-gray-300"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? errorId : undefined}
        className={[
          "w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition",
          "placeholder:text-slate-400",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          "dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-blue-900",
          "disabled:cursor-not-allowed disabled:bg-slate-100",
          errorMessage
            ? "border-red-500 focus:border-red-500 focus:ring-red-100 dark:border-red-400 dark:focus:ring-red-950"
            : "border-slate-300 dark:border-gray-700 dark:focus:ring-blue-900",
        ].join(" ")}
        {...register(name)}
      />

      {errorMessage && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-sm text-red-600 dark:text-red-400"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
