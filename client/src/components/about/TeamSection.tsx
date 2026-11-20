import { TeamMember } from "@/types/team";
import Container from "../common/ui/Container";
import Section from "../common/ui/Section";
import SectionHeading from "../common/ui/SectionHeading";
import TeamMemberCard from "./TeamMemberCard";

interface TeamSectionProps {
  members: TeamMember[];
}

export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <Section background="light">
      <Container>
        <SectionHeading
          eyebrow="Our People"
          title="Meet Our Team"
          description="Meet the people behind our ideas, innovation, and technology solutions."
        />

        {members.length === 0 ? (
          <p className="text-center text-slate-500">
            No team members are currently available.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <TeamMemberCard key={member.documentId} member={member} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
