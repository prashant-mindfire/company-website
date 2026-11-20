import ServiceCard from "@/components/home/ServiceCard";
import { Service } from "@/types/service";

interface ServicesPageSectionProps {
  services: Service[];
}

const ServicesPageSection = ({
  services,
}: ServicesPageSectionProps) => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            What We Do
          </p>

          <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
            Our Services
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Explore our technology services designed to help
            businesses innovate, scale, and grow.
          </p>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-slate-500">
            No services are currently available.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.documentId}
                service={service}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ServicesPageSection;