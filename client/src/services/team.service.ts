import strapiFetch from "@/lib/strapi";
import { StrapiResponse } from "@/types/strapi";
import { TeamMember } from "@/types/team";

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await strapiFetch<StrapiResponse<TeamMember[]>>(
    "team-members",
    {
      query: {
        populate: "*",
        sort: "displayOrder:asc",
      },
    }
  );

  return response.data;
}