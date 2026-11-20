import { TeamMember } from "@/types/team";
import TeamMemberCard from "./TeamMemberCard";

interface TeamSectionProps {
  members: TeamMember[];
}

const TeamSection = ({
  members,
}: TeamSectionProps) => {
  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Our People
          </p>

          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Meet Our Team
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Meet the people behind our ideas, innovation, and
            technology solutions.
          </p>
        </div>

        {members.length === 0 ? (
          <p className="text-center text-slate-500">
            Team information is currently unavailable.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <TeamMemberCard
                key={member.documentId}
                member={member}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamSection;