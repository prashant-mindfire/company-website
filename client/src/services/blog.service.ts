import strapiFetch from "@/lib/strapi";
import { BlogListingResult, BlogPost, GetBlogPostsParams } from "@/types/blog";
import { StrapiResponse } from "@/types/strapi";

export const getFeaturedBlogs = async (limit = 3): Promise<BlogPost[]> => {
  const response = await strapiFetch<StrapiResponse<BlogPost[]>>("blog-posts", {
    query: {
      populate: "*",
      "filters[featured][$eq]": "true",
      "sort[0]": "publishedDate:desc",
      "pagination[pageSize]": String(limit),
    },
  });

  return response.data;
};

export const getBlogPosts = async ({
  page = 1,
  pageSize = 6,
  search = "",
}: GetBlogPostsParams = {}): Promise<BlogListingResult> => {
  const query: Record<string, string> = {
    populate: "*",
    "sort[0]": "publishedDate:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  };

  const searchTerm = search.trim();

  if (searchTerm) {
    query["filters[$or][0][title][$containsi]"] = searchTerm;
    query["filters[$or][1][excerpt][$containsi]"] = searchTerm;
    query["filters[$or][2][author][$containsi]"] = searchTerm;
  }

  const response = await strapiFetch<StrapiResponse<BlogPost[]>>("blog-posts", {
    query,
    revalidate: 60,
  });

  return {
    posts: response.data,
    pagination: response.meta?.pagination ?? {
      page,
      pageSize,
      pageCount: 1,
      total: response.data.length,
    },
  };
};

export const getBlogPostBySlug = async (
  slug: string
): Promise<BlogPost | null> => {
  const response = await strapiFetch<StrapiResponse<BlogPost[]>>("blog-posts", {
    query: {
      populate: "*",
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": "1",
    },
    revalidate: 60,
  });

  return response.data[0] ?? null;
};

export const getAllBlogSlugs = async (): Promise<{ slug: string }[]> => {
  const pageSize = 100;
  let currentPage = 1;
  let pageCount = 1;

  const slugs: { slug: string }[] = [];

  while (currentPage <= pageCount) {
    const response = await strapiFetch<
      StrapiResponse<Pick<BlogPost, "slug">[]>
    >("blog-posts", {
      query: {
        "fields[0]": "slug",
        "pagination[page]": String(currentPage),
        "pagination[pageSize]": String(pageSize),
      },
      revalidate: 60,
    });

    slugs.push(
      ...response.data.map((post) => ({
        slug: post.slug,
      }))
    );

    pageCount = response.meta?.pagination?.pageCount ?? 1;
    currentPage++;
  }

  return slugs;
};
