import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  background?: "white" | "light" | "dark";
  spacing?: "sm" | "md" | "lg";
};

const backgroundStyles = {
  white: "bg-white",
  light: "bg-slate-50",
  dark: "bg-slate-900 text-white",
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
