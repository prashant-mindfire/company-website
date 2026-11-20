import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = ({
  children,
  className = "",
  padding = "md",
  hoverable = false,
  ...props
}: CardProps) => {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        paddingStyles[padding],
        hoverable
          ? "transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
