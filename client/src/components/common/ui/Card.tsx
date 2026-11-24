"use client";

import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

export default function Card({
  children,
  padding = "md",
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm
        dark:border-gray-800 dark:bg-gray-900 dark:shadow-none
        ${paddingClasses[padding]}
        ${hoverable ? "transition hover:-translate-y-1 hover:shadow-md dark:hover:border-gray-700" : ""}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
