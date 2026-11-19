import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedBlogsSection from "@/components/home/FeaturedBlogsSection";
import { getSiteSettings } from "@/services/site.service";
import { getFeaturedServices } from "@/services/service.service";
import { getFeaturedBlogs } from "@/services/blog.service";

// Generate this page statically
export const dynamic = "force-static";

export default async function Home() {
  const [settings, services, blogs] = await Promise.all([
    getSiteSettings(),
    getFeaturedServices(),
    getFeaturedBlogs(3),
  ]);

  return (
    <main>
      <HeroSection
        title={settings.bannerTitle}
        subtitle={settings.bannerSubtitle}
      />
      <ServicesSection services={services} />
      <FeaturedBlogsSection blogs={blogs} />
    </main>
  );
}
