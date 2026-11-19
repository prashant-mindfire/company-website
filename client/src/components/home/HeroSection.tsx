interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({
  title,
  subtitle,
}: HeroSectionProps) {
  return (
    <section className="bg-blue-700 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-blue-100">
          {subtitle}
        </p>
      </div>
    </section>
  );
}