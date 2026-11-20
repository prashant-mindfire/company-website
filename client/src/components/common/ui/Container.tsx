import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "md" | "lg" | "xl" | "full";
};

const sizeStyles = {
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

const Container = ({
  children,
  className = "",
  size = "xl",
  ...props
}: ContainerProps) => {
  return (
    <div
      className={["mx-auto w-full px-6", sizeStyles[size], className].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
