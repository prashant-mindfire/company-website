import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/utils";
import { TeamMember } from "@/types/team";

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-4/3 bg-slate-100">
        <Image
          src={getStrapiMediaUrl(member.photo?.url)}
          alt={member.photo?.alternativeText || member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>

        <p className="mt-1 text-sm font-medium text-blue-600">
          {member.designation}
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-600">{member.bio}</p>

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-4 inline-block text-sm font-medium text-slate-900 hover:text-blue-600"
          >
            {member.email}
          </a>
        )}
      </div>
    </article>
  );
};

export default TeamMemberCard;
