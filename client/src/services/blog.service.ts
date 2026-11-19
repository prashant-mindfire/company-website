import strapiFetch from "@/lib/strapi";
import { BlogPost } from "@/types/blog";
import { StrapiResponse } from "@/types/strapi";

export const getFeaturedBlogs = async (
  limit = 3
): Promise<BlogPost[]> => {
  const response = await strapiFetch<
    StrapiResponse<BlogPost[]>
  >("blog-posts", {
    query: {
      populate: "*",
      "filters[featured][$eq]": "true",
      "sort[0]": "publishedDate:desc",
      "pagination[pageSize]": String(limit),
    },
  });

  return response.data;
}