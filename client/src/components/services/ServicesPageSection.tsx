import ServiceCard from "@/components/common/ServiceCard";
import { Service } from "@/types/service";
import Container from "../common/ui/Container";
import Section from "../common/ui/Section";
import SectionHeading from "../common/ui/SectionHeading";

interface ServicesPageSectionProps {
  services: Service[];
}

export default function ServicesPageSection({
  services,
}: ServicesPageSectionProps) {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          description="Explore our technology services designed to help businesses innovate, scale, and grow."
        />

        {services.length === 0 ? (
          <p className="text-center text-slate-500">
            No services are currently available.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.documentId} service={service} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
