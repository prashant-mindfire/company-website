import type { Metadata } from "next";
import { getServices } from "@/services/service.service";
import ServicesPageSection from "@/components/services/ServicesPageSection";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Services | TechNova Solutions",
  description:
    "Explore web development, mobile app development, cloud solutions, and other services from TechNova Solutions.",
};

const ServicesPage = async () => {
  const services = await getServices();

  return (
    <main>
      <ServicesPageSection services={services} />
    </main>
  );
}

export default ServicesPage;