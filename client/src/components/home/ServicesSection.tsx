import { Service } from "@/types/service";
import ServiceCard from "../common/ServiceCard";

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>

          <p className="mt-3 text-gray-600">
            Innovative solutions to help your business grow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.documentId} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
