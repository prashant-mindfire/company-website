import type { Metadata } from "next";
import { getSiteSettings } from "@/services/site.service";
import { getTeamMembers } from "@/services/team.service";
import MissionVision from "@/components/about/MissionVision";
import TeamSection from "@/components/about/TeamSection";
import PageHero from "@/components/common/ui/PageHero";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about TechNova Solutions, our mission, vision and the team behind our technology services.",
};

export default async function AboutPage() {
  const [settings, teamMembers] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ]);

  return (
    <main>
      <PageHero
        eyebrow="About Us"
        title={`Get to know ${settings.companyName}`}
        description="We help businesses transform their ideas into meaningful digital experiences through technology and innovation."
      />
      <MissionVision mission={settings.mission} vision={settings.vision} />
      <TeamSection members={teamMembers} />
    </main>
  );
}
