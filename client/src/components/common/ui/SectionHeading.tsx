interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

const alignmentStyles = {
  left: "text-left",
  center: "text-center mx-auto",
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) => {
  return (
    <div className={`mb-12 max-w-2xl ${alignmentStyles[align]} ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-4 leading-7 text-slate-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
