interface MissionVisionProps {
  mission?: string;
  vision?: string;
}

const MissionVision = ({ mission, vision }: MissionVisionProps) => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-blue-50 p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Our Mission
          </h2>

          <p className="leading-8 text-slate-600">{mission}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Vision</h2>

          <p className="leading-8 text-slate-600">{vision}</p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
