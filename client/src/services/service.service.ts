import strapiFetch from "@/lib/strapi";
import { Service } from "@/types/service";
import { StrapiResponse } from "@/types/strapi";

export const getServices = async (): Promise<Service[]> => {
  const response = await strapiFetch<
    StrapiResponse<Service[]>
  >("services", {
    query: {
      populate: "*",
      sort: "createdAt:asc",
    },
  });

  return response.data;
}

export const getFeaturedServices = async (): Promise<Service[]> => {
  const response = await strapiFetch<
    StrapiResponse<Service[]>
  >("services", {
    query: {
      populate: "*",
      "filters[featured][$eq]": "true",
      sort: "createdAt:asc",
    },
  });

  return response.data;
}