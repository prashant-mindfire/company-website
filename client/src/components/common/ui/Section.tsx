import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  background?: "white" | "light" | "dark";
  spacing?: "sm" | "md" | "lg";
};

const backgroundStyles = {
  white: "bg-white dark:bg-gray-950",
  light: "bg-gray-50 dark:bg-gray-900",
  dark: "bg-gray-900 text-white dark:bg-gray-950",
};

const spacingStyles = {
  sm: "py-10",
  md: "py-16",
  lg: "py-20",
};

const Section = ({
  children,
  className = "",
  background = "white",
  spacing = "lg",
  ...props
}: SectionProps) => {
  return (
    <section
      className={[
        backgroundStyles[background],
        spacingStyles[spacing],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
