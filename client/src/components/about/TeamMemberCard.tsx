import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/utils";
import { TeamMember } from "@/types/team";
import Card from "../common/ui/Card";
import Link from "next/link";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card
      padding="none"
      hoverable
      className="flex h-full flex-col overflow-hidden"
    >
      <div className="relative h-52 w-full shrink-0 bg-slate-100">
        <Image
          src={getStrapiMediaUrl(member.photo?.url)}
          alt={member.photo?.alternativeText || member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {member.name}
        </h3>

        <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
          {member.designation}
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-gray-400">
          {member.bio}
        </p>

        {member.email && (
          <Link
            href={`mailto:${member.email}`}
            className="mt-auto pt-4 inline-block self-start text-sm font-medium text-slate-900 hover:text-blue-600 dark:text-blue-400"
          >
            {member.email}
          </Link>
        )}
      </div>
    </Card>
  );
}
