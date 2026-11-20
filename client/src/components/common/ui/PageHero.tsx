interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: "dark" | "light";
}

const variantStyles = {
  dark: "bg-slate-900 text-white",
  light: "bg-slate-50 text-slate-900",
};

const PageHero = ({
  eyebrow,
  title,
  description,
  variant = "dark",
}: PageHeroProps) => {
  const isDark = variant === "dark";

  return (
    <section className={`${variantStyles[variant]} px-6 py-20`}>
      <div className="mx-auto max-w-7xl text-center">
        {eyebrow && (
          <p
            className={`mb-4 text-sm font-semibold uppercase tracking-widest ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {eyebrow}
          </p>
        )}

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          {title}
        </h1>

        {description && (
          <p
            className={`mx-auto mt-6 max-w-2xl text-lg leading-8 ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
