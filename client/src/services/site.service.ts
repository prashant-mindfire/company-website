import strapiFetch from "@/lib/strapi";
import { SiteSettings } from "@/types/site";
import { StrapiResponse } from "@/types/strapi";

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const response = await strapiFetch<StrapiResponse<SiteSettings>>(
    "site-setting",
    {
      query: {
        populate: "*",
      },
    }
  );

  return response.data;
};
