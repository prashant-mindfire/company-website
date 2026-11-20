import type { Metadata } from "next";
import { getSiteSettings } from "@/services/site.service";
import { getTeamMembers } from "@/services/team.service";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import TeamSection from "@/components/about/TeamSection";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About Us | TechNova Solutions",
  description:
    "Learn about TechNova Solutions, our mission, vision, and the team behind our technology solutions.",
};

export default async function AboutPage() {
  const [settings, teamMembers] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ]);

  return (
    <main>
      <AboutHero companyName={settings.companyName} />
      <MissionVision
        mission={settings.mission}
        vision={settings.vision}
      />
      <TeamSection members={teamMembers} />
    </main>
  );
}