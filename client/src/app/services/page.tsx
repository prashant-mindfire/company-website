import type { Metadata } from "next";
import { getServices } from "@/services/service.service";
import ServicesPageSection from "@/components/services/ServicesPageSection";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore web development, mobile application development and cloud solutions from TechNova Solutions.",
};

const ServicesPage = async () => {
  const services = await getServices();

  return (
    <main>
      <ServicesPageSection services={services} />
    </main>
  );
};

export default ServicesPage;
