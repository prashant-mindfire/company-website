interface AboutHeroProps {
  companyName: string;
}

const AboutHero = ({ companyName }: AboutHeroProps) => {
  return (
    <section className="bg-slate-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
          About Us
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Get to know {companyName}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          We help businesses transform their ideas into meaningful digital
          experiences through technology and innovation.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
